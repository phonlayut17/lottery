import Header from "../../src/components/Header";
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Modal } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ThreeSummaryPage(props) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { user, userType } = location.state || {};
    const [showSpinner, setShowSpinner] = useState(false);
    const [showTB, setShowTB] = useState(false);
    const [showBT, setShowBT] = useState(false);
    const [myLottery, setLottery] = useState("ทั้งหมด");
    const inputSearch = useRef();
    const [key, setKey] = useState('all');

    const setLotteryType = (event) => {
        const getLottery = event.target.value;
        setLottery(getLottery);
    }

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
        if (k === 'all') {
            setKey(k);
            inputSearch.current.value = getCurrentDate();
            inputSearch.current.disabled = true;
            getData();
        }
        else if (k === 'yesterday') {
            setKey(k);
            inputSearch.current.value = getYesterdayDate();
            inputSearch.current.disabled = true;
            searchByDate();
        } else {
            setKey(k);
            inputSearch.current.value = getCurrentDate();
            inputSearch.current.disabled = false;
        }
    };

    const searchByType = async (type) => {
        handleShowSpinner();
        setData([]);
        setSTop(0.00);
        setSBottom(0.00);
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list-and-type', {
                type: type
            });
            if (dataRes.data.success) {
                setData(dataRes.data.data);
                sumTop(dataRes.data.data);
                sumBottom(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        handleShowSpinner();
        setData([]);
        setSTop(0.00);
        setSBottom(0.00);
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list');
            if (dataRes.data.success) {
                setData(dataRes.data.data);
                sumTop(dataRes.data.data);
                sumBottom(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    };

    const searchByData = async (type) => {
        handleShowSpinner();
        setData([]);
        setSTop(0.00);
        setSBottom(0.00);
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list-by-search', {
                type: type,
                date: inputSearch.current.value
            });
            if (dataRes.data.success) {
                setData(dataRes.data.data);
                sumTop(dataRes.data.data);
                sumBottom(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    }

    const searchByDate = async () => {
        handleShowSpinner();
        setData([]);
        setSTop(0.00);
        setSBottom(0.00);
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list-by-date', {
                date: inputSearch.current.value
            });
            if (dataRes.data.success) {
                setData(dataRes.data.data);
                sumTop(dataRes.data.data);
                sumBottom(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    }

    const handleCloseSpinner = () => {
        setShowSpinner(false);
    };

    const handleShowSpinner = () => {
        setShowSpinner(true);
    };

    const handleSortMaxTop = () => {
        const sortedData = [...data].sort((a, b) => b.sum_3_top - a.sum_3_top);
        setData(sortedData);
    };

    const handleSortMinTop = () => {
        const sortedData = [...data].sort((a, b) => a.sum_3_top - b.sum_3_top);
        setData(sortedData);
    };

    const handleSortMaxToot = () => {
        const sortedData = [...data].sort((a, b) => b.sum_3_toot - a.sum_3_toot);
        setData(sortedData);
    };

    const handleSortMinToot = () => {
        const sortedData = [...data].sort((a, b) => a.sum_3_toot - b.sum_3_toot);
        setData(sortedData);
    };

    const setTop = () => {
        handleShowSpinner();
        if (showTB) {
            handleSortMaxTop();
            setShowTB(false);
        } else {
            handleSortMinTop();
            setShowTB(true);
        }
        handleCloseSpinner();
    }

    const setToot = () => {
        handleShowSpinner();
        if (showBT) {
            handleSortMaxToot();
            setShowBT(false);
        } else {
            handleSortMinToot();
            setShowBT(true);
        }
        handleCloseSpinner();
    }

    const search = async () => {
        if (myLottery === "ทั้งหมด") {
            // search from date
            searchByDate();
        } else {
            // search from lottery type and date
            searchByData(myLottery);
        }
    }

    const handleDateChange = () => {
        const fromDate = inputSearch.current.value;
        console.log('From:', fromDate);
    };

    const [sTop, setSTop] = useState(0.00);
    const [sBottom, setSBottom] = useState(0.00);

    const sumTop = (list) => {
        setSTop(0.00);
        let summary = 0;
        list.forEach((sData) => {
            summary += sData.sum_3_top;
        });
        setSTop(summary);
    }

    const sumBottom = (list) => {
        setSBottom(0.00);
        let summary = 0;
        list.forEach((sData) => {
            summary += sData.sum_3_toot;
        });
        setSBottom(summary);
    }

    useEffect(() => {
        const getCurrentDateFormatted = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set the initial value of inputDateFrom and inputDateTo
        inputSearch.current.value = getCurrentDateFormatted();
    }, []);

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
                                variant={key === 'all' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('all')}
                                style={{ marginRight: '8px' }}
                            >
                                ทั้งหมด
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
                    <Row>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ประเภท</Form.Label>
                            <form controlId="winnerType">
                                <Form.Select value={myLottery} className="form-control" disabled={key === 'all' || key === 'yesterday'} onChange={(e) => (setLotteryType(e))}>
                                    <option value="ทั้งหมด">ทั้งหมด</option>
                                    <option value="ฮานอย พิเศษ">ฮานอย พิเศษ 🇻🇳</option>
                                    <option value="ฮานอย">ฮานอย 🇻🇳</option>
                                    <option value="ฮานอย VIP">ฮานอย VIP 🇻🇳 🅥🅘🅟</option>
                                    <option value="ลาวพัฒนา">ลาวพัฒนา 🇱🇦</option>
                                    <option value="ลาว VIP">ลาว VIP 🇱🇦 🅥🅘🅟</option>
                                </Form.Select>
                            </form>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ใส่เลข</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputSearch}
                                    placeholder="ระบุวันที่"
                                    onChange={handleDateChange}
                                    disabled={key === 'all' || key === 'yesterday'}
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
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col"><h4>เลข</h4></th>
                                <th scope="col" onClick={() => setTop()}><h4>บน</h4></th>
                                <th scope="col" onClick={() => setToot()}><h4>โต๊ด</h4></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data === null || data.length === 0 ? (
                                <tr>
                                    <td colSpan="3">❌ ไม่มีข้อมูล ❌</td>
                                </tr>
                            ) : (
                                <>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.data_dtl_number}</td>
                                            <td>{item.sum_3_top}</td>
                                            <td>{item.sum_3_toot}</td>
                                            <td>{item.data_hdr_lot_type}</td>
                                        </tr>
                                    ))}
                                </>
                            )}
                            {data !== null || data.length !== 0 ? (
                                <>
                                    <tr>
                                        <td>รวม {data.length} รายการ</td>
                                        <td>{sTop} บาท</td>
                                        <td>{sBottom} บาท</td>
                                        <td>-</td>
                                    </tr>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </tbody>
                    </table>
                    <Modal show={showSpinner} onHide={handleCloseSpinner} centered>
                        <Modal.Body align="center">
                            <div class="custom-loader"></div>
                            <br />
                            <h4>รอสักครู่...</h4>
                        </Modal.Body>
                    </Modal>
                </Col>
            </body>
        </>
    );
}

export default ThreeSummaryPage;
