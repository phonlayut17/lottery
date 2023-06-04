import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const SixBackLottery = (props) => {

    // const input = useRef();

    const inputTop = useRef();

    // const [sixList, setSixList] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleThreeChange = (e) => {
        if (e.target.value.length === 3) {
            e.preventDefault();
            props.setSixList([...props.sixList, props.inputSix.current.value]);
            let data = props.inputSix.current.value;
            if (data.charAt(0) === data.charAt(1) && data.charAt(0) === data.charAt(2) && data.charAt(1) === data.charAt(2)) {
                props.inputSix.current.value = "";
                return;
            } else if (data.charAt(0) !== data.charAt(1) && data.charAt(0) !== data.charAt(2) && data.charAt(1) !== data.charAt(2)) {
                convertPositionNumber(data, 1);
            } else if (data.charAt(0) === data.charAt(1) || data.charAt(0) === data.charAt(2) || data.charAt(1) === data.charAt(2)) {
                convertPositionNumber(data, 2);
            }
            props.inputSix.current.value = "";
        } else if (e.target.value.length > 3) {
            const inputValue = e.target.value;
            const regex = /[.\-\/+=*,x\s]/g;
            const substrings = inputValue.split(regex).filter(Boolean);
            const filteredList = substrings.filter((item) => /^\d{3}$/.test(item) && item.length === 3);
            filteredList.forEach((subData) => {
                if (subData.charAt(0) === subData.charAt(1) && subData.charAt(0) === subData.charAt(2) && subData.charAt(1) === subData.charAt(2)) {
                    props.setSixList([...props.sixList, subData[0] + subData[0] + subData[0]]);
                    props.sixList.push(subData[0] + subData[0] + subData[0]);
                }
                else if (subData.charAt(0) !== subData.charAt(1) && subData.charAt(0) !== subData.charAt(2) && subData.charAt(1) !== subData.charAt(2)) {
                    convertPositionNumber(subData, 1);
                } else if (subData.charAt(0) === subData.charAt(1) || subData.charAt(0) === subData.charAt(2) || subData.charAt(1) === subData.charAt(2)) {
                    convertPositionNumber(subData, 2);
                }
            });
            props.inputSix.current.value = "";
        }
    };

    const handleSixRemoveAll = () => {
        props.setSixList([]);
    };

    const handleSixRemove = (index) => {
        const list = [...props.sixList];
        list.splice(index, 1);
        props.setSixList(list);
    };

    // const handleSixDataRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const addToList = e => {
        e.preventDefault();
        if (props.sixList !== null && props.sixList.length !== 0) {
            if (props.sixList !== null && props.sixList.length !== 0 && inputTop.current.value !== 0 && inputTop.current.value.trim() !== "") {
                const regex = /[.\-\/+=*,x\s]/g;
                const filteredList = props.sixList.filter((item) => /^\d{3}$/.test(item) && !regex.test(item) && item.length === 3);
                props.setShowList([
                    ...props.showList,
                    {
                        id: "3",
                        number: filteredList,
                        top: inputTop.current.value,
                        bottom: 0,
                        toot: 0
                    }
                ]);
                props.calculatePrice(parseInt(inputTop.current.value), parseInt(filteredList.length));
                inputTop.current.value = "";
                handleSixRemoveAll();
            } else if (inputTop.current.value.trim() === "") {
                setShowError(...showError, 'กรุณากรอกราคาที่จะเล่น');
                handleShowModal();
            }
        } else {
            setShowError(...showError, 'กรุณากรอกเลขที่จะเล่น');
            handleShowModal();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    function convertPositionNumber(data, type) {
        if (type === 1) {
            props.setSixList([...props.sixList, data[0] + data[1] + data[2]]);
            props.sixList.push(data[0] + data[1] + data[2]);
            props.setSixList([...props.sixList, data[0] + data[2] + data[1]]);
            props.sixList.push(data[0] + data[2] + data[1]);
            props.setSixList([...props.sixList, data[1] + data[0] + data[2]]);
            props.sixList.push(data[1] + data[0] + data[2]);
            props.setSixList([...props.sixList, data[1] + data[2] + data[0]]);
            props.sixList.push(data[1] + data[2] + data[0]);
            props.setSixList([...props.sixList, data[2] + data[1] + data[0]]);
            props.sixList.push(data[2] + data[1] + data[0]);
            props.setSixList([...props.sixList, data[2] + data[0] + data[1]]);
            props.sixList.push(data[2] + data[0] + data[1]);
        } else if (type === 2) {
            if (data[0] === data[1]) {
                props.setSixList([...props.sixList, data[0] + data[0] + data[2]]);
                props.sixList.push(data[0] + data[0] + data[2]);
                props.setSixList([...props.sixList, data[0] + data[2] + data[0]]);
                props.sixList.push(data[0] + data[2] + data[0]);
                props.setSixList([...props.sixList, data[2] + data[0] + data[0]]);
                props.sixList.push(data[2] + data[0] + data[0]);
            } else if (data[1] === data[2]) {
                props.setSixList([...props.sixList, data[2] + data[2] + data[0]]);
                props.sixList.push(data[2] + data[2] + data[0]);
                props.setSixList([...props.sixList, data[2] + data[0] + data[2]]);
                props.sixList.push(data[2] + data[0] + data[2]);
                props.setSixList([...props.sixList, data[0] + data[2] + data[2]]);
                props.sixList.push(data[0] + data[2] + data[2]);
            } else {
                props.setSixList([...props.sixList, data[2] + data[2] + data[1]]);
                props.sixList.push(data[2] + data[2] + data[1]);
                props.setSixList([...props.sixList, data[2] + data[1] + data[2]]);
                props.sixList.push(data[2] + data[1] + data[2]);
                props.setSixList([...props.sixList, data[1] + data[2] + data[2]]);
                props.sixList.push(data[1] + data[2] + data[2]);
            }
        }
    };


    return (
        <Col>
            <Row>
                {props.sixList.map((item, b) => (
                    <Col sm={1} onClick={() => handleSixRemove(b)}>
                        <Button variant="danger" onClick={() => handleSixRemove(b)}>
                            {item}
                        </Button>
                        <br />
                        <br />
                    </Col>
                ))}
            </Row>
            <br />
            <form onSubmit={addToList}>
                <Row>
                    <Col sm>
                    </Col>
                    <Col sm></Col>
                    <Col sm align="right">
                        {Array.isArray(props.sixList) && props.sixList.length > 0 && (
                            <Row>
                                <Button variant="light" onClick={() => handleSixRemoveAll()}>
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
                            <Form.Control type="text" ref={props.inputSix} min={0} onChange={(e) => handleThreeChange(e)} placeholder="ระบุเลข" autoFocus />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'black' }}>บน</Form.Label>
                        <Form.Group controlId="formNumberTop">
                            <Form.Control name="numberTop"
                                type="number"
                                id="numberTop"
                                min={0}
                                ref={inputTop}
                                maxLength={4}
                                placeholder="ระบุเลข"
                                onKeyDown={(e) => handleKeyDown(e)} />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                        <Form.Group controlId="formNumber">
                            <Row>
                                <Button variant="success" type="sumbit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                    เพิ่มบิล
                                </Button>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
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

export default SixBackLottery;