import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { IoTrashBinOutline } from "react-icons/io5";
import axios from 'axios';
import { Modal, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const History = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState([]);
    const [showButton, setShowButton] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);

    const handleCloseSpinner = () => {
        setShowSpinner(false);
    };

    const handleShowSpinner = () => {
        setShowSpinner(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowButton(true);
    };

    const handleShowModal = (data) => {
        setShowButton(true);
        setShowMessage(...showMessage, 'แน่ใจหรือไม่ว่าต้องการลบ ?');
        setShowModal(true);
        setId(data);
    };

    const getData = async () => {
        try {
            const dataRes = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-list-by-user', {
                user: props.user
            });
            console.log(dataRes.data);
            setData(dataRes.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const show = () => {
        console.log(data);
    };

    const confirmDelete = async () => {
        handleShowSpinner();
        try {
            const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/delete-by-id', { id: id });
            const data = response.data;
            if (data.success) {
                setShowButton(false);
                setShowModal(false);
                handleCloseSpinner();
                setShowMessage(...showMessage, 'ลบข้อมูลสำเร็จ');
                setShowModal(true);
                getData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const isDataArray = Array.isArray(data);

    return (
        <Col>
            <table className="table table-striped">
                <thead className="text-center">
                    <tr>
                        <th scope="col"><h4>#</h4></th>
                        <th scope="col"><h4>วันที่แทง</h4></th>
                        <th scope="col"><h4>ตลาด</h4></th>
                        <th scope="col"><h4>บาท</h4></th>
                        <th scope="col"><h4>หมายเหตุ</h4></th>
                        <th scope="col"><h4>ลบโพย</h4></th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {isDataArray && data.length === 0 ? (
                        <tr>
                            <td colSpan="7">❌ ไม่มีข้อมูล ❌</td>
                        </tr>
                    ) : isDataArray ? (
                        data.map((item, b) => (
                            <tr key={b}>
                                <td>{b + 1}</td>
                                <td>{new Date(item.data_dtl_date).toLocaleDateString('th-TH')}</td>
                                <td>{item.data_hdr_lot_type}</td>
                                <td>{item.data_dtl_price}</td>
                                <td>{item.data_hdr_comment}</td>
                                <td><IoTrashBinOutline size={20} style={{ color: '#D50000' }} onClick={() => handleShowModal(item.data_hdr_id)} /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">❌ ไม่มีข้อมูล ❌</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body>
                    {/* Modal content */}
                    <p>{showMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    {showButton ? (
                        <Button variant="danger" onClick={confirmDelete}>
                            ยืนยัน
                        </Button>
                    ) : null}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSpinner} onHide={handleCloseSpinner} centered>
                <Modal.Body align="center">
                    <Spinner animation="border" role="status">
                    </Spinner>
                    <br />
                    <h4>รอสักครู่...</h4>
                </Modal.Body>
            </Modal>
        </Col >
    );
}

export default History;
