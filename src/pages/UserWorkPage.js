import { Col, Row, Form, Button, Modal } from "react-bootstrap";
import Header from "../../src/components/Header";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react';

function UserWorkPage(props) {
    const location = useLocation();
    const inputSearch = useRef();
    const [showSpinner, setShowSpinner] = useState(false);
    const [data, setData] = useState([]);
    const [bill, setBill] = useState([]);
    const { user, userType } = location.state || {};
    const [myUser, setMyUser] = useState("all");
    const setUserType = (event) => {
        const getUser = event.target.value;
        setMyUser(getUser);
    }
    const getData = async () => {
        setBill([]);
        handleShowSpinner();
        try {
            let dataRes;
            dataRes = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/get-list-user');
            if (dataRes.data.success) {
                console.log(dataRes.data.success);
                setData(dataRes.data.user);
                console.log(dataRes.data.user);
                if (myUser === "all") {
                    getByDate();
                }
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    };
    const getByDate = async () => {
        setBill([]);
        handleShowSpinner();
        try {
            console.log(inputSearch.current.value);
            let dataRes;
            dataRes = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/get-sum-bill-by-date', {
                date: inputSearch.current.value
            });
            if (dataRes.data.success) {
                console.log(dataRes.data.success);
                setBill(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    }
    const getByUserDate = async () => {
        setBill([]);
        handleShowSpinner();
        try {
            let dataRes;
            dataRes = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/get-sum-bill-by-user-and-date', {
                user: myUser, date: inputSearch.current.value
            });
            if (dataRes.data.success) {
                console.log(dataRes.data.success);
                setBill(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
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
    useEffect(() => {
        getData();
    }, []);

    const handleCloseSpinner = () => {
        setShowSpinner(false);
    };

    const handleShowSpinner = () => {
        setShowSpinner(true);
    };
    const handleDateChange = () => {
        const fromDate = inputSearch.current.value;
        console.log('From:', fromDate);
    };
    const search = async () => {
        if (myUser === "all") {
            getByDate();
        } else {
            getByUserDate();
        }
    }
    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header user={user} userType={userType} />
            </header>
            <body>
                <Col>
                    <Row style={{ paddingTop: 100, paddingLeft: 16, paddingRight: 16 }} className="d-flex align-items-center row">
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ประเภท</Form.Label>
                            <form controlId="winnerType">
                                <Form.Select value={myUser} className="form-control" onChange={(e) => (setUserType(e))}>
                                    <option value="all">ทั้งหมด</option>
                                    {data.map((item, index) => (
                                        <option value={item.user_id}>{item.user_id}</option>
                                    ))}
                                </Form.Select>
                            </form>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>วันที่</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputSearch}
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
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col"><h4>พนักงาน</h4></th>
                                <th scope="col"><h4>จำนวนโพย</h4></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {bill === null || bill.length === 0 ? (
                                <tr>
                                    <td colSpan="3">❌ ไม่มีข้อมูล ❌</td>
                                </tr>
                            ) : (
                                <>
                                    {bill.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.data_hdr_user}</td>
                                            <td>{item.data_hdr_bill}</td>
                                        </tr>
                                    ))}
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

export default UserWorkPage;