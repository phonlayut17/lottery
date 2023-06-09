import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import { IoTrashBinOutline } from "react-icons/io5";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const History = (props) => {
    const [showModal, setShowModal] = useState(false);

    const [showMessage, setShowMessage] = useState('');

    const [id, setId] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = (data) => {
        setShowMessage(...showMessage, 'แน่ใจหรือไม่ว่าต้องการลบ ?');
        setShowModal(true);
        setId(data);
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/delete-by-id', { id: id });
            const data = response.data;
            if (data.success) {
                setShowModal(false);
                setShowMessage(...showMessage, 'ลบข้อมูลสำเร็จ');
                setShowModal(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const show = () => {
        console.log(props.data);
    };

    const isDataArray = Array.isArray(props.data);

    return (
        <Col>
            <table class="table table-striped">
                <thead class="text-center">
                    <tr>
                        <th scope="col"><h4>#</h4></th>
                        <th scope="col"><h4>วันที่แทง</h4></th>
                        <th scope="col"><h4>ตลาด</h4></th>
                        <th scope="col"><h4>บาท</h4></th>
                        <th scope="col"><h4>หมายเหตุ</h4></th>
                        <th scope="col"><h4>ลบโพย</h4></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    {isDataArray && props.data.length === 0 ? (
                        <tr>
                            <td colSpan="7">❌ ไม่มีข้อมูล ❌</td>
                        </tr>
                    ) : isDataArray ? (
                        props.data.map((item, b) => (
                            <tr key={b}>
                                <td>{new Date(item.data_dtl_date).toLocaleDateString('th-TH')}</td>
                                <td>{item.data_hdr_lot_type}</td>
                                <td>{item.data_dtl_price}</td>
                                <td>{item.data_hdr_comment}</td>
                                <td><IoTrashBinOutline size={20} style={{ color: '#D50000' }} onClick={handleShowModal(item.data_hdr_id)} /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" onClick={show()}>Invalid data format</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* Modal content */}
                    <p>{showMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>
                        ยืนยัน
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default History;
