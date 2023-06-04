import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useEffect } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const TwoLottery = (props) => {

    // const input = useRef();

    const inputTop = useRef();

    const inputBottom = useRef();

    // const [twoList, setTwoList] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleTwoChange = (e) => {
        if (e.target.value.length === 2) {
            e.preventDefault();
            props.setTwoList([...props.twoList, props.inputTwo.current.value]);
            props.inputTwo.current.value = "";
        } else if (e.target.value.length > 2) {
            const inputValue = e.target.value;
            const regex = /[.\-\/+=,x\s]/g;
            const substrings = inputValue.split(regex).filter(Boolean);
            const filteredList = substrings.filter((item) => /^\d{2}$/.test(item) && !regex.test(item));
            props.setTwoList((prevList) => [...prevList, ...filteredList]);
            props.inputTwo.current.value = "";
        }
    };

    const handleTwoRemoveAll = () => {
        props.setTwoList([]);
    };

    const handleTwoRemove = (index) => {
        const list = [...props.twoList];
        list.splice(index, 1);
        props.setTwoList(list);
    };

    const addToList = e => {
        e.preventDefault();
        if (props.twoList !== null && props.twoList.length !== 0) {
            if (props.twoList !== null && props.twoList.length !== 0) {
                if (inputTop.current.value.trim() !== "" || inputBottom.current.value.trim() !== "") {
                    if (inputTop.current.value !== 0 || inputBottom.current.value !== 0) {
                        if (inputTop.current.value.trim() === "") {
                            inputTop.current.value = 0;
                        }
                        if (inputBottom.current.value.trim() === "") {
                            inputBottom.current.value = 0;
                        }
                        const regex = /[.\-\/+=*,x\s]/g;
                        const filteredList = props.twoList.filter((item) => /^\d{2}$/.test(item) && !regex.test(item));
                        props.setShowList([
                            ...props.showList,
                            {
                                id: "1",
                                number: filteredList,
                                top: inputTop.current.value,
                                bottom: inputBottom.current.value,
                                toot: 0
                            }
                        ]);
                        props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputBottom.current.value), parseInt(filteredList.length));
                        inputTop.current.value = "";
                        inputBottom.current.value = "";
                        handleTwoRemoveAll();
                    }
                } else {
                    setShowError(...showError, 'กรุณากรอกราคาที่จะเล่น');
                    handleShowModal();
                }
            } else if (inputTop.current.value.trim() === "" || inputBottom.current.value.trim() === "") {
                setShowError(...showError, 'กรุณากรอกราคาที่จะเล่น');
                handleShowModal();
            }

        } else {
            setShowError(...showError, 'กรุณากรอกเลขที่จะเล่น');
            handleShowModal();
        }
    };

    const dataDoubleSet = [
        "00",
        "11",
        "22",
        "33",
        "44",
        "55",
        "66",
        "77",
        "88",
        "99",
    ]

    const addDoubleToList = () => {
        props.setTwoList([...props.twoList, ...dataDoubleSet]);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32) { // Check if the key pressed is the spacebar (key code 32)
                convertPositionNumber();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const convertPositionNumber = () => {
        props.twoList.forEach((twoData) => {
            // setTwoList([...twoList, ...twoData]);
            if (twoData[0] !== twoData[1]) {
                // let newData = twoData[1] + twoData[0];
                props.setTwoList([...props.twoList, twoData[1] + twoData[0]]);
                props.twoList.push(twoData[1] + twoData[0]);
            }
        });
    };

    const handleSkipFocus = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            inputTop.current.focus();
            inputTop.current.select();
        }
    };

    // const [setNewListItem] = useState([]);

    return (
        <Col>
            <Row>
                {props.twoList.map((item, b) => (
                    <Col sm={1} onClick={() => handleTwoRemove(b)}>
                        <Button variant="danger" onClick={() => handleTwoRemove(b)}>
                            {item}
                        </Button>
                        <br />
                        <br />
                    </Col>
                ))}
            </Row>
            <br />
            <form onSubmit={addToList}>
                <Col>
                    <Row>
                        <Col align="left" sm>
                            <Button variant="light" onClick={() => addDoubleToList()}>
                                เลขเบิ้ล
                            </Button>
                        </Col>
                        <Col sm></Col>
                        <Col align="right" sm>
                            {Array.isArray(props.twoList) && props.twoList.length > 0 && (
                                <Row>
                                    <Button variant="light" onClick={() => handleTwoRemoveAll()}>
                                        ลบเลขทั้งหมด
                                    </Button>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ใส่เลข</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="text"
                                    pattern="[0-9]*"
                                    min={0}
                                    ref={props.inputTwo}
                                    onChange={(e) => handleTwoChange(e)}
                                    placeholder="ระบุเลข"
                                    onKeyDown={handleSkipFocus}
                                    autoFocus
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Row>
                                    <Button variant="light" onClick={() => convertPositionNumber()}>
                                        กลับเลข
                                    </Button>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>บน</Form.Label>
                            <Form.Group controlId="formNumberTop">
                                <Form.Control name="numberTop"
                                    type="number"
                                    id="numberTop"
                                    ref={inputTop}
                                    maxLength={4}
                                    min={0}
                                    placeholder="ระบุเลข" />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ล่าง</Form.Label>
                            <Form.Group controlId="formNumberBottom">
                                <Form.Control name="numberBottom"
                                    type="number"
                                    maxLength={4}
                                    ref={inputBottom}
                                    id="numberBottom"
                                    min={0}
                                    placeholder="ระบุเลข"
                                    onKeyDown={(e) => handleKeyDown(e)} />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Row>
                                    <Button variant="success" type="submit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                        เพิ่มบิล
                                    </Button>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </form>
            <br />
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

export default TwoLottery;