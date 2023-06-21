import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoTrashBinOutline } from "react-icons/io5";
import axios from 'axios';
import { Modal } from "react-bootstrap";

const TotalLottery = ({ summaryList, setSummaryList, lotteryType, setTotal, setShowList, comment, clearPrice, totalPrice, setTotalPrice, user }) => {

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const [showModalSuccess, setShowModalSuccess] = useState(false);

    const [showSuccess, setShowSuccess] = useState('');

    const handleCloseSuccess = () => {
        setShowModalSuccess(false);
        setSummaryList([]);
        setShowList([]);
        clearPrice();
        setTotal(false);
    };

    const handleShowSuccess = () => {
        setShowModalSuccess(true);
    };

    const handleServiceRemove = (index, price) => {
        const list = [...summaryList];
        list.splice(index, 1);
        setSummaryList(list);
        minusPrice(price);
    };

    const minusPrice = (data) => {
        const newTotalPrice = totalPrice - parseFloat(data);
        setTotalPrice(newTotalPrice);
    };

    const showTotal = () => {
        setTotal(false);
    };

    const cancel = () => {
        setSummaryList([]);
        setShowList([]);
        setTotal(false);
        clearPrice();
    };

    const getLastBill = async () => {
        try {
            const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/get-last-lot');
            const data = response.data;
            console.log("data: " + data.success);

            if (data.success === false) {
                return "lot0001";
            } else {
                const substring = data.id.substring(3);
                const newNumber = String(parseInt(substring, 10) + 1).padStart(substring.length, '0');
                const newLotNumber = 'lot' + newNumber;
                return newLotNumber;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const saveHeader = async (id) => {
        try {
            const body = {
                id: id,
                type: lotteryType === "hanoi-normal" ? "ฮานอย" : lotteryType === "hanoi-privilege" ? "ฮานอย พิเศษ" : lotteryType === "hanoi-vip" ? "ฮานอย VIP" : lotteryType === "lao-normal" ? "ลาวพัฒนา" : "ลาว VIP",
                date: new Date(),
                user: user,
                price: totalPrice,
                comment: comment
            };
            const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/add-header', body);
            const data = response.data;
            console.log(data);
            if (data.success) {
                // setShowSuccess(...showError, 'บันทึกสำเร็จ');
                // handleShowSuccess();
            } else {
                setShowError(...showError, data.message);
                handleShowModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveBody = async (id) => {
        summaryList.forEach(async (summaryData) => {
            try {
                const body = {
                    id: id,
                    type: summaryData.id,
                    number: summaryData.data,
                    type_price: summaryData.type,
                    discount: summaryData.discount,
                    bet: summaryData.bet,
                    price: summaryData.amount,
                    date: new Date(),
                    user: user
                };
                const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/add-body', body);
                const data = response.data;
                console.log(data);
                if (data.success) {
                    // setShowError(...showError, 'บันทึกสำเร็จ');
                    // handleShowModal();
                } else {
                    setShowError(...showError, data.message);
                    handleShowModal();
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    const save = async () => {
        if (summaryList === null || summaryList === 0) {
            setShowError(...showError, 'ไม่มีข้อมูลให้บันทึก');
            handleShowModal();
        } else {
            const id = await getLastBill();
            saveHeader(id);
            saveBody(id);
            setShowSuccess(...showSuccess, 'บันทึกสำเร็จ');
            handleShowSuccess();
        }
    };

    const print = () => {
        // Capture the entire page as an image using html2canvas
        html2canvas(document.body).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            // Calculate the dimensions of the PDF page based on the canvas size
            const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth - 20;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add the captured image to the PDF
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

            // Save the PDF file
            const currentDate = new Date();
            const currentDateTimeString = currentDate.toLocaleString('th');

            pdf.save('../pdf/' + currentDateTimeString + 'table.pdf');
        });
    };

    return (
        <Col>
            <br />
            <br />
            <br />
            <h2 align="center">ประเภทหวย - {lotteryType === "hanoi-normal" ? "ฮานอย 🇻🇳" : lotteryType === "hanoi-privilege" ? "ฮานอย พิเศษ 🇻🇳" : lotteryType === "hanoi-vip" ? "ฮานอย VIP 🇻🇳 🅥🅘🅟" : "ลาว VIP 🇱🇦 🅥🅘🅟"}</h2>
            <br />
            <h2 align="center">กรุณายืนยันรายการ</h2>
            <br />
            <table class="table table-striped">
                <thead class="text-center">
                    <tr>
                        <th scope="col"><h3>ประเภท</h3></th>
                        <th scope="col"><h3>หมายเลข</h3></th>
                        <th scope="col"><h3>ยอดเดิมพัน</h3></th>
                        {/* <th scope="col"><h3>เรทจ่าย</h3></th>
                        <th scope="col"><h3>ส่วนลด</h3></th> */}
                        <th scope="col"><h3>ลบ</h3></th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    {summaryList.map((item, index) => (
                        <tr>
                            <th scope="row">{item.type}</th>
                            <th scope="row">{item.data}</th>
                            <td>{item.amount}</td>
                            {/* <td>{item.bet}</td>
                            <td>{item.discount}</td> */}
                            <td>
                                {/* <Button variant="danger" onClick={() => handleServiceRemove(index)}>
                                    ❌ ลบบิล
                                </Button> */}
                                <IoTrashBinOutline size={35} style={{ color: '#D50000' }} onClick={() => handleServiceRemove(index, item.amount)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <h4 style={{ textAlign: "center" }}>
                หมายเหตุ {comment === "" ? " - " : " - " + comment}
            </h4>
            <br />
            {/* <h2 align="center"><b>ยอดเดิมพัน {totalPrice} บาท</b></h2>
            <br />
            <h2 align="center"><b>ส่วนลด 0.00 บาท</b></h2>
            <br /> */}
            <h2 align="center"><b>รวม {totalPrice} บาท</b></h2>
            <br />
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Button variant="secondary" onClick={showTotal}>
                        🔙 กลับ
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="danger" onClick={cancel}>
                        🗑️ ยกเลิก
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="success" onClick={save}>
                        💾 บันทึก
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={print}>
                        🖨️ พิมพ์
                    </Button>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* Modal content */}
                    <p>{showError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalSuccess} onHide={handleCloseSuccess} centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    {/* Modal content */}
                    <p>{showSuccess}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseSuccess}>
                        กลับหน้าแรก
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default TotalLottery;
