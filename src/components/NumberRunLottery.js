import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";
import '../index.js';
const NumberRunLottery = (props) => {

    const input = useRef();

    const inputTop = useRef();

    const inputBottom = useRef();

    const [oneList, setOneList] = useState([]);

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
            setOneList([...oneList, input.current.value]);
            input.current.value = "";
        }
    };

    const handleOneRemoveAll = () => {
        setOneList([]);
    };

    const handleOneRemove = (index) => {
        const list = [...oneList];
        list.splice(index, 1);
        setOneList(list);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const addToList = e => {
        e.preventDefault();
        if (Array.isArray(oneList)) {
            if (oneList !== null && oneList.length !== 0 && inputTop.current.value !== 0 && inputBottom.current.value !== 0 && inputTop.current.value.trim() !== "" && inputBottom.current.value.trim() !== "") {
                props.setShowList([
                    ...props.showList,
                    {
                        id: "5",
                        number: oneList,
                        top: inputTop.current.value,
                        bottom: inputBottom.current.value,
                        toot: 0
                    }
                ]);
                props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputBottom.current.value), parseInt(oneList.length));
                inputTop.current.value = "";
                inputBottom.current.value = "";
                handleOneRemoveAll();
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
                {oneList.map((item, b) => (
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
                        {Array.isArray(oneList) && oneList.length > 0 && (
                            <Row>
                                <Button variant="light" onClick={() => handleOneRemoveAll()}>
                                    🗑️ ลบเลขทั้งหมด
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
                            <Form.Control type="number" ref={input} onChange={(e) => handleOneChange(e)} placeholder="ระบุเลข" maxLength={2} />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'black' }}>บน</Form.Label>
                        <Form.Group controlId="formNumberTop">
                            <Form.Control name="numberTop"
                                type="number"
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
                                type="number"
                                maxLength={3}
                                ref={inputBottom}
                                id="numberBottom"
                                placeholder="ระบุเลข" />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                        <Form.Group controlId="formNumber">
                            <Row>
                                <Button variant="success" type="sumbit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                    🎰 เพิ่มบิล
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

export default NumberRunLottery;