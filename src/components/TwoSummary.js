import Header from "../../src/components/Header";
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Modal, Spinner } from "react-bootstrap";

function TwoSummaryPage(props) {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { user, userType } = location.state || {};
    const [showSpinner, setShowSpinner] = useState(false);
    const [showTB, setShowTB] = useState(false);
    const [showBT, setShowBT] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        handleShowSpinner();
        try {
            let dataRes;
            dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-two-list');
            if (dataRes.data.success) {
                setData(dataRes.data.data);
                console.log(dataRes.data.data);
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
        const sortedData = [...data].sort((a, b) => b.sum_2_top - a.sum_2_top);
        setData(sortedData);
    };

    const handleSortMinTop = () => {
        const sortedData = [...data].sort((a, b) => a.sum_2_top - b.sum_2_top);
        setData(sortedData);
    };

    const handleSortMaxBottom = () => {
        const sortedData = [...data].sort((a, b) => b.sum_2_bottom - a.sum_2_bottom);
        setData(sortedData);
    };

    const handleSortMinBottom = () => {
        const sortedData = [...data].sort((a, b) => a.sum_2_bottom - b.sum_2_bottom);
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

    const setBottom = () => {
        handleShowSpinner();
        if (showBT) {
            handleSortMaxBottom();
            setShowBT(false);
        } else {
            handleSortMinBottom();
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
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col"><h4>เลข</h4></th>
                                <th scope="col" onClick={() => setTop()}><h4>บน</h4></th>
                                <th scope="col" onClick={() => setBottom()}><h4>ล่าง</h4></th>
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
                                            <td>{item.sum_2_top}</td>
                                            <td>{item.sum_2_bottom}</td>
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

export default TwoSummaryPage;
