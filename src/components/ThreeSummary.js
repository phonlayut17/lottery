import Header from "../../src/components/Header";
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Modal, Spinner } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function ThreeSummaryPage(props) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { user, userType } = location.state || {};
    const [showSpinner, setShowSpinner] = useState(false);
    const [showTB, setShowTB] = useState(false);
    const [showBT, setShowBT] = useState(false);
    const [myLottery, setLottery] = useState("all");

    const setLotteryType = (event) => {
        const getLottery = event.target.value;
        setLottery(getLottery);
        console.log('ประเภท ' + event.target.value);
        if (event.target.value !== "ทั้งหมด") {
            searchByType(event.target.value);
        } else {
            getData();
        }

    }

    const searchByType = async (type) => {
        handleShowSpinner();
        setData([]);
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list-and-type', {
                type: type
            });
            if (dataRes.data.success) {
                setData(dataRes.data.data);
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
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-three-list');
            if (dataRes.data.success) {
                setData(dataRes.data.data);
            } else {
                console.log(dataRes.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    };

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

    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header user={user} userType={userType} />
            </header>
            <body>
                <Col>
                    <Row>
                        <form controlId="winnerType">
                            <Form.Select value={myLottery} className="form-control" onChange={(e) => (setLotteryType(e))}>
                                <option value="ทั้งหมด">ทั้งหมด</option>
                                <option value="ฮานอย พิเศษ">ฮานอย พิเศษ 🇻🇳</option>
                                <option value="ฮานอย">ฮานอย 🇻🇳</option>
                                <option value="ฮานอย VIP">ฮานอย VIP 🇻🇳 🅥🅘🅟</option>
                                <option value="ลาวพัฒนา">ลาวพัฒนา 🇱🇦</option>
                                <option value="ลาว VIP">ลาว VIP 🇱🇦 🅥🅘🅟</option>
                            </Form.Select>
                        </form>
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
                        </tbody>
                    </table>
                    <Modal show={showSpinner} onHide={handleCloseSpinner} centered>
                        <Modal.Body align="center">
                            <Spinner animation="border" role="status">
                            </Spinner>
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
