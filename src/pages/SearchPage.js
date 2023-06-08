import Header from "../../src/components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useRef, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function SearchPage(props) {
    const [key, setKey] = useState('today');
    const inputSearch = useRef();
    const inputDateFrom = useRef();
    const inputDateTo = useRef();
    const [data, setData] = useState([]);
    const location = useLocation();
    const { user, userType } = location.state || {};

    useEffect(() => {
        const getCurrentDateFormatted = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set the initial value of inputDateFrom and inputDateTo
        inputDateFrom.current.value = getCurrentDateFormatted();
        inputDateTo.current.value = getCurrentDateFormatted();
        inputDateFrom.current.disabled = true;
        inputDateTo.current.disabled = true;
        inputSearch.current.disabled = true;
    }, []);

    const handleDateChange = () => {
        const fromDate = inputDateFrom.current.value;
        const toDate = inputDateTo.current.value;

        // Set the minimum date for inputDateTo based on inputDateFrom
        inputDateTo.current.min = fromDate;

        console.log('From:', fromDate);
        console.log('To:', toDate);
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getYesterdayDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate() - 1).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTabSelect = (k) => {
        if (k === 'today') {
            setKey(k);
            inputDateFrom.current.value = getCurrentDate();
            inputDateTo.current.value = getCurrentDate();
            inputDateFrom.current.disabled = true;
            inputDateTo.current.disabled = true;
            inputSearch.current.disabled = true;
        }
        else if (k === 'yesterday') {
            setKey(k);
            inputDateFrom.current.value = getYesterdayDate();
            inputDateTo.current.value = getYesterdayDate();
            inputDateFrom.current.disabled = true;
            inputDateTo.current.disabled = true;
            inputSearch.current.disabled = true;
        } else {
            setKey(k);
            inputDateFrom.current.value = getCurrentDate();
            inputDateTo.current.value = getCurrentDate();
            inputDateTo.current.disabled = false;
            inputDateFrom.current.disabled = false;
            inputSearch.current.disabled = false;
        }
    };

    const search = async () => {
        if (key === 'today' || key === 'yesterday') {
            try {
                const body = {
                    date_from: inputDateFrom.current.value,
                    date_to: inputDateTo.current.value,
                };
                const response = await axios.post('https://afternoon-sea-27548.herokuapp.com/search-by-date', body);
                const data = response.data;
                console.log(data);
                if (data.success) {
                    setData(data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const body = {
                    number: inputSearch.current.value,
                    lottery_type: myLottery,
                    date_from: inputDateFrom.current.value,
                    date_to: inputDateTo.current.value,
                };
                const response = await axios.post('https://afternoon-sea-27548.herokuapp.com/search', body);
                const data = response.data;
                console.log(data);
                if (data.success) {
                    setData(data.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const [myLottery, setLottery] = useState("2 ตัวบน");

    const setLotteryType = (event) => {
        const getLottery = event.target.value;
        setLottery(getLottery);
    }

    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header user={user} userType={userType} />
            </header>
            <body>
                <Col>
                    <Row style={{ paddingTop: 100, paddingLeft: 16, paddingRight: 16 }} className="d-flex align-items-center row">
                        <div className="mb-3">
                            <Button
                                variant={key === 'today' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('today')}
                                style={{ marginRight: '8px' }}
                            >
                                วันนี้
                            </Button>
                            <Button
                                variant={key === 'yesterday' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('yesterday')}
                                style={{ marginRight: '8px' }}
                            >
                                เมื่อวาน
                            </Button>
                            <Button
                                variant={key === 'search' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('search')}
                                style={{ marginRight: '8px' }}
                            >
                                กรอกข้อมูล
                            </Button>
                        </div>
                    </Row>
                    <Row style={{ paddingLeft: 16, paddingRight: 16 }}>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ใส่เลข</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="text"
                                    min={0}
                                    ref={inputSearch}
                                    placeholder="ระบุเลข"
                                    autoFocus
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Row>
                                <Form.Label style={{ color: 'black' }}>ประเภทหวย</Form.Label>
                                <form controlId="winnerType">
                                    <Form.Select value={myLottery} disabled={key === 'yesterday' || key === 'today'} className="form-control" onChange={(e) => (setLotteryType(e))}>
                                        <option value="">--กรุณาเลือกประเภท--</option>
                                        <option value="2 ตัวบน">2 ตัวบน</option>
                                        <option value="2 ตัวล่าง">2 ตัวล่าง</option>
                                        <option value="3 ตัวบน">3 ตัวบน</option>
                                        <option value="3 ตัวโต๊ด">3 ตัวโต๊ด</option>
                                        <option value="วิ่งบน">วิ่งบน</option>
                                        <option value="วิ่งล่าง">วิ่งล่าง</option>
                                    </Form.Select>
                                </form>
                            </Row>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>วันที่เริ่ม</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputDateFrom}
                                    placeholder="ระบุวันที่"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>วันที่สิ้นสุด</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputDateTo}
                                    placeholder="ระบุวันที่"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={1}>
                            <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Button variant="primary" onClick={search}>
                                    🔍 ค้นหา
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <table class="table table-striped">
                        <thead class="text-center">
                            <tr>
                                <th scope="col"><h4>บิล</h4></th>
                                <th scope="col"><h4>วันที่</h4></th>
                                <th scope="col"><h4>ประเภทหวย</h4></th>
                                <th scope="col"><h4>เลขหวย</h4></th>
                                <th scope="col"><h4>ราคา</h4></th>
                                <th scope="col"><h4>พนักงาน</h4></th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            {data === null || data.length === 0 ? (
                                <tr>
                                    <td colspan="7">❌ ไม่มีข้อมูล ❌</td>
                                </tr>
                            ) : (
                                <>
                                    {data.map((item, b) => (
                                        <tr key={b}>
                                            <td>{item.data_dtl_id}</td>
                                            <td>{new Date(item.data_dtl_date).toLocaleDateString('th-TH')}</td>
                                            <td>{item.data_hdr_lot_type}</td>
                                            <td>{item.data_dtl_number}</td>
                                            <td>{item.data_dtl_price}</td>
                                            <td>{item.data_dtl_user}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </Col>
            </body>
        </>
    );
}

export default SearchPage;
