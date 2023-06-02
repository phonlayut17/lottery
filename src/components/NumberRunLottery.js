import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";
import '../index.js';
const NumberRunLottery = (props) => {

    // const input = useRef();

    const inputTop = useRef();

    const inputBottom = useRef();

    // const [oneList, setOneList] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleOneChange = (e) => {
        if (e.target.value.length === 1) {
            e.preventDefault();
            props.setOneList([...props.oneList, props.inputNumber.current.value]);
            props.inputNumber.current.value = "";
        }
    };

    const handleOneRemoveAll = () => {
        props.setOneList([]);
    };

    const handleOneRemove = (index) => {
        const list = [...props.oneList];
        list.splice(index, 1);
        props.setOneList(list);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const addToList = e => {
        e.preventDefault();
        if (Array.isArray(props.oneList)) {
            if (props.oneList !== null && props.oneList.length !== 0 && inputTop.current.value !== 0) {
                if (inputTop.current.value.trim() !== "" || inputBottom.current.value.trim() !== "") {
                    if (inputTop.current.value !== 0 || inputBottom.current.value !== 0) {
                        if (inputTop.current.value.trim() == "") {
                            inputTop.current.value = 0;
                        }
                        if (inputBottom.current.value.trim() == "") {
                            inputBottom.current.value = 0;
                        }
                        props.setShowList([
                            ...props.showList,
                            {
                                id: "5",
                                number: props.oneList,
                                top: inputTop.current.value,
                                bottom: inputBottom.current.value,
                                toot: 0
                            }
                        ]);
                        props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputBottom.current.value), parseInt(props.oneList.length));
                        inputTop.current.value = "";
                        inputBottom.current.value = "";
                        handleOneRemoveAll();
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
            // Handle the case when twoList is not an array
            setShowError(...showError, 'กรุณากรอกเลขที่จะเล่น');
            handleShowModal();
        }
    };

    return (
        <Col>
            <Row>
                {props.oneList.map((item, b) => (
                    <Col sm={1} onClick={() => handleOneRemove(b)}>
                        <Button variant="danger" onClick={() => handleOneRemove(b)}>
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
                    <Col sm>
                        {Array.isArray(props.oneList) && props.oneList.length > 0 && (
                            <Row>
                                <Button variant="light" onClick={() => handleOneRemoveAll()}>
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
                            <Form.Control type="text" ref={props.inputNumber} onChange={(e) => handleOneChange(e)} placeholder="ระบุเลข" maxLength={2} autoFocus />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'black' }}>บน</Form.Label>
                        <Form.Group controlId="formNumberTop">
                            <Form.Control name="numberTop"
                                type="text"
                                id="numberTop"
                                ref={inputTop}
                                maxLength={3}
                                placeholder="ระบุเลข" />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'black' }}>ล่าง</Form.Label>
                        <Form.Group controlId="formNumberBottom">
                            <Form.Control name="numberBottom"
                                type="text"
                                maxLength={3}
                                ref={inputBottom}
                                id="numberBottom"
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

export default NumberRunLottery;