import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";
import '../index.js';

const NineteenDoorLottery = (props) => {

    // const input = useRef();

    const inputTop = useRef();

    const inputBottom = useRef();

    const [nineteenList, setNineteenList] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleNineteenChange = (e) => {
        if (e.target.value.length === 1) {
            e.preventDefault();
            matchingPositionNumber(props.inputNineteen.current.value);
            // setNineteenList([...nineteenList, input.current.value]);
            orderByList();
            props.setNineteenList((prevList) => [...prevList, ...nineteenList]);
            props.inputNineteen.current.value = "";
            setNineteenList([]);
        }
    };

    const orderByList = () => {
        nineteenList.sort((a, b) => parseInt(a) - parseInt(b));
        setNineteenList([...nineteenList]);
    };

    const handleNineteenRemoveAll = () => {
        props.setNineteenList([]);
    };

    const handleNineteenRemove = (index) => {
        const list = [...props.nineteenList];
        list.splice(index, 1);
        props.setNineteenList(list);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const addToList = e => {
        e.preventDefault();
        if (nineteenList !== null && nineteenList.length !== 0) {
            if (nineteenList !== null && nineteenList.length !== 0) {
                if (inputTop.current.value.trim() !== "" || inputBottom.current.value.trim() !== "") {
                    if (inputTop.current.value !== 0 || inputBottom.current.value !== 0) {
                        if (inputTop.current.value.trim() === "") {
                            inputTop.current.value = 0;
                        }
                        if (inputBottom.current.value.trim() === "") {
                            inputBottom.current.value = 0;
                        }
                        props.setShowList([
                            ...props.showList,
                            {
                                id: "4",
                                number: nineteenList,
                                top: inputTop.current.value,
                                bottom: inputBottom.current.value,
                                toot: 0
                            }
                        ]);
                        props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputBottom.current.value), parseInt(nineteenList.length));
                        inputTop.current.value = "";
                        inputBottom.current.value = "";
                        handleNineteenRemoveAll();
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

    const dataDoubleSet = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    ]

    const matchingPositionNumber = (data) => {
        dataDoubleSet.forEach((nineteenData) => {
            if (data !== nineteenData) {
                setNineteenList([...nineteenList, data + nineteenData]);
                nineteenList.push(data + nineteenData);
            }
        });
        dataDoubleSet.forEach((nineteenData) => {
            if (data !== nineteenData) {
                setNineteenList([...nineteenList, nineteenData + data]);
                nineteenList.push(nineteenData + data);
            }
        });
        setNineteenList([...nineteenList, data + data]);
        nineteenList.push(data + data);
    };


    return (
        <Col>
            <Row>
                {props.nineteenList.map((item, b) => (
                    <Col sm={1} onClick={() => handleNineteenRemove(b)}>
                        <Button variant="danger" onClick={() => handleNineteenRemove(b)}>
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
                        {Array.isArray(props.nineteenList) && props.nineteenList.length > 0 && (
                            <Row>
                                <Button variant="light" onClick={() => handleNineteenRemoveAll()}>
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
                        <Form.Control type="text" ref={props.inputNineteen} onChange={(e) => handleNineteenChange(e)} placeholder="ระบุเลข" maxLength={2} autoFocus/>
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
                        <Form.Group controlId="formNumber">
                            <Form.Group controlId="formNumberBottom">
                                <Form.Control name="numberBottom"
                                    type="text"
                                    maxLength={3}
                                    ref={inputBottom}
                                    id="numberBottom"
                                    placeholder="ระบุเลข" />
                            </Form.Group>
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

export default NineteenDoorLottery;