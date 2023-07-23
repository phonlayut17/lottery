import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { IoTrashBinOutline } from "react-icons/io5";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const History = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState([]);
    const [lottery, setLottery] = useState('');
    const [date, setDate] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [totalPrice, setTotalPrice] = useState('');

    const handleCloseSpinner = () => {
        setShowSpinner(false);
    };

    const handleShowSpinner = () => {
        setShowSpinner(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    const handleShowDetail = () => {
        setShowDetail(true);
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
        handleCloseDetail();
    };

    const getData = async () => {
        handleShowSpinner();
        try {
            const dataRes = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/get-list-by-user', {
                user: props.user
            });
            console.log(dataRes.data);
            setData(dataRes.data.data);
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    };

    const getDataById = async (id) => {
        handleShowSpinner();
        try {
            const dataRes = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/get-data-by-id', {
                id: id
            });
            if (dataRes.data.success) {
                setLottery(dataRes.data.lot_type);
                cvDate(dataRes.data.date);
                setDetail(dataRes.data.data);
                setTotalPrice(dataRes.data.total);
                handleShowDetail();
            } else {
                console.log(dataRes.data.message);
            }
            console.log(dataRes.data);
        } catch (error) {
            console.log(error);
        }
        handleCloseSpinner();
    };

    useEffect(() => {
        getData();
    }, []);

    const confirmDelete = async () => {
        handleShowSpinner();
        try {
            const response = await axios.post('https://us-central1-lucky-server-2e663.cloudfunctions.net/app/delete-by-id', { id: id });
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

    const cvDate = (dateR) => {
        const dataDate = new Date(dateR);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const thaiDate = dataDate.toLocaleDateString("th-TH", options);
        setDate(thaiDate);
    };

    const isDataArray = Array.isArray(data);
    const isDetailArray = Array.isArray(detail);

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
                            <tr key={b} onClick={() => getDataById(item.data_hdr_id)}>
                                <td>{b + 1}</td>
                                <td>{new Date(item.data_dtl_date).toLocaleDateString('th-TH')}</td>
                                <td>{item.data_hdr_lot_type}</td>
                                <td>{item.data_hdr_total_price}</td>
                                <td>{item.data_hdr_comment}</td>
                                <td>
                                    <IoTrashBinOutline
                                        size={20}
                                        style={{ color: '#D50000', cursor: 'pointer' }} // Add cursor: 'pointer' to indicate clickable
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event propagation to the parent row click event
                                            handleShowModal(item.data_hdr_id);
                                        }}
                                    />
                                </td>
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
                    <div class="custom-loader"></div>
                    <br />
                    <h4>รอสักครู่...</h4>
                </Modal.Body>
            </Modal>
            <Modal show={showDetail} onHide={handleCloseDetail} centered>
                <Modal.Body>
                    <h5>หวย{lottery} - {date}</h5>
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr>
                                <th scope="col"><h4>#</h4></th>
                                <th scope="col"><h4>ประเภท @ หมายเลข</h4></th>
                                <th scope="col"><h4>ราคา</h4></th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {isDetailArray && detail.length === 0 ? (
                                <tr>
                                    <td colSpan="7">❌ ไม่มีข้อมูล ❌</td>
                                </tr>
                            ) : isDetailArray ? (
                                detail.map((item, b) => (
                                    <tr key={b}>
                                        <td>{b + 1}</td>
                                        <td>{item.data_dtl_type_price} @ {item.data_dtl_number}</td>
                                        <td>{item.data_dtl_price}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">❌ ไม่มีข้อมูล ❌</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan="2">รวม {detail.length} รายการ</td>
                                <td>{totalPrice} บาท</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col >
    );
}

export default History;
