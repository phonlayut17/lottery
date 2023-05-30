import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useRef, useEffect } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const TwoLottery = (props) => {

    const input = useRef();

    const inputTop = useRef();

    const inputBottom = useRef();

    const [twoList, setTwoList] = useState([]);

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
            setTwoList([...twoList, input.current.value]);
            input.current.value = "";
        }
    };

    // const handleServiceRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const handleTwoRemoveAll = () => {
        setTwoList([]);
    };

    const handleTwoRemove = (index) => {
        const list = [...twoList];
        list.splice(index, 1);
        setTwoList(list);
    };

    const addToList = e => {
        e.preventDefault();
        if (twoList !== null && twoList.length !== 0) {
            if (twoList !== null && twoList.length !== 0 && inputTop.current.value !== 0 && inputBottom.current.value !== 0 && inputTop.current.value.trim() !== "" && inputBottom.current.value.trim() !== "") {
                props.setShowList([
                    ...props.showList,
                    {
                        id: "1",
                        number: twoList,
                        top: inputTop.current.value,
                        bottom: inputBottom.current.value,
                        toot: 0
                    }
                ]);
                props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputBottom.current.value), parseInt(twoList.length));
                inputTop.current.value = "";
                inputBottom.current.value = "";
                handleTwoRemoveAll();
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
        setTwoList([...twoList, ...dataDoubleSet]);
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
        twoList.forEach((twoData) => {
            // setTwoList([...twoList, ...twoData]);
            if (twoData[0] !== twoData[1]) {
                // let newData = twoData[1] + twoData[0];
                setTwoList([...twoList, twoData[1] + twoData[0]]);
                twoList.push(twoData[1] + twoData[0]);
            }
        });
    };

    // const [setNewListItem] = useState([]);

    return (
        <Col>
            <div className="App">
                <Row>
                    {twoList.map((item, b) => (
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
                    <Container>
                        <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: '#D50000' }}>
                            <Container>
                                <Row>
                                    <Col sm={2}>
                                        <Button variant="light" onClick={() => addDoubleToList()}>
                                            9️⃣9️⃣ เลขเบิ้ล
                                        </Button>
                                    </Col>
                                    <Col sm></Col>
                                    <Col sm={2}>
                                        {Array.isArray(twoList) && twoList.length > 0 && (
                                            <Button variant="light" onClick={() => handleTwoRemoveAll()}>
                                                🗑️ ลบเลขทั้งหมด
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col sm={3}>
                                        <Form.Label style={{ color: 'white' }}>ใส่เลข</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Form.Control type="number" ref={input} onChange={(e) => handleTwoChange(e)} placeholder="ระบุเลข" maxLength={2} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Label style={{ color: '#D50000' }}>กลับ</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Button variant="light" onClick={() => convertPositionNumber()}>
                                                🔁 กลับเลข
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Label style={{ color: 'white' }}>บน</Form.Label>
                                        <Form.Group controlId="formNumberTop">
                                            <Form.Control name="numberTop"
                                                type="number"
                                                id="numberTop"
                                                ref={inputTop}
                                                maxLength={3}
                                                min={0}
                                                placeholder="ระบุเลข" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Label style={{ color: 'white' }}>ล่าง</Form.Label>
                                        <Form.Group controlId="formNumberBottom">
                                            <Form.Control name="numberBottom"
                                                type="number"
                                                maxLength={3}
                                                ref={inputBottom}
                                                id="numberBottom"
                                                min={0}
                                                placeholder="ระบุเลข" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm>
                                        <Form.Label style={{ color: '#D50000' }}>กลับ</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Button variant="success" type="submit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                                🎰 เพิ่มบิล
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                        <br />
                    </Container>
                </form>
                {/* <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: '#FFFFFF' }}>
                    {newListItem.map((item, b) => (
                        <Col>
                            <Row key={b}>
                                <Col sm={11}>
                                    <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: '#FFFFFF' }}>
                                        <Row>
                                            <Col sm={4}>
                                                <h4><b>ประเภท : {item.type}</b></h4>
                                            </Col>
                                            <Col sm>
                                                <h4><b>เลข : {item.data}</b></h4>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row sm={3}>
                                            <h4><b>ราคา : บน {item.top} x ล่าง {item.bottom}</b></h4>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col sm>
                                    <Button variant="danger" onClick={() => handleServiceRemove(b)}>
                                        ลบบิล
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    ))}
                </Card> */}
            </div >
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
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default TwoLottery;