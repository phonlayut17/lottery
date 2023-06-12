import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useRef, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import laos from '../images/laos.png';
import laosVip from '../images/laos-vip.png';
import vietnam from '../images/vietnam.png';
import vietnamPrivilege from '../images/vietnam-privilege.png';
import vietnamVip from '../images/vietnam-vip.png';
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";

const Comment = (props) => {
    const [thaiTime, setUKTime] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour12: false,
                timeZone: 'Europe/London',
            };
            const ukTime = new Intl.DateTimeFormat('en-GB', options).format(new Date());
            setUKTime(ukTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const inputComment = useRef();

    const handleCommentChange = () => {
        // props.setComment([...props.comment, inputComment.current.value]);
    }

    const removeAll = () => {
        props.setShowList([]);
        props.clearPrice();
        props.clearAll();
    };

    const showTotal = () => {
        console.log(props.summaryList);
        if (props.showList === null || props.showList.length === 0) {
            setShowError(...showError, 'กรุณากรอกหวย');
            handleShowModal();
        } else {
            props.addToSummaryList();
            props.setComment(inputComment.current.value);
            props.setTotal(true);
        }
    };

    return (
        <Col>
            <b>
                <Row>
                    <Col sm={2}>
                        <h4 align="right" style={{ color: 'black' }}>หมายเหตุ</h4>
                    </Col>
                    <Col sm>
                        <Row>
                            <Form.Group controlId="formComment">
                                <Form.Control name="comment"
                                    type="text"
                                    id="comment"
                                    ref={inputComment}
                                    onChange={handleCommentChange()}
                                    placeholder="" />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <h5 align="right">{thaiTime}</h5>
                        {/* {<img align="top" src={props.lotteryType === "hanoi-normal" ? vietnam : props.lotteryType === "hanoi-privilege" ? vietnamPrivilege : props.lotteryType === "hanoi-vip" ? vietnamVip : props.lotteryType === "lao-normal" ? laos : props.lotteryType === "lao-vip" ? laosVip : ""} alt="" width={60} height={60} />} */}
                    </Col>
                </Row>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h3 align="center">
                        [หวยต่างประเทศ] - &nbsp;
                        {props.lotteryType === "hanoi-normal" ? "ฮานอย" :
                            props.lotteryType === "hanoi-privilege" ? "ฮานอย พิเศษ" :
                                props.lotteryType === "hanoi-vip" ? "ฮานอย VIP" :
                                    props.lotteryType === "lao-normal" ? "ลาวพัฒนา" :
                                        "ลาว VIP"}
                    </h3>
                    &nbsp;
                    <img
                        align="top"
                        src={
                            props.lotteryType === "hanoi-normal" ? vietnam :
                                props.lotteryType === "hanoi-privilege" ? vietnamPrivilege :
                                    props.lotteryType === "hanoi-vip" ? vietnamVip :
                                        props.lotteryType === "lao-normal" ? laos :
                                            props.lotteryType === "lao-vip" ? laosVip : ""
                        }
                        alt=""
                        width={60}
                        height={60}
                    />
                </div>
                <h2 align="center"><b>รวม {props.price} บาท</b></h2>
                <br />
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <Button variant="danger" onClick={() => removeAll()}>
                            ล้างตาราง
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => showTotal()}>
                            บันทึก
                        </Button>
                    </Col>
                </Row>
            </b>
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
        </Col>
    );
}

export default Comment;