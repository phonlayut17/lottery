import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";
import '../index.js';

const NineteenDoorLottery = (props) => {

    const input = useRef();

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
            matchingPositionNumber(input.current.value);
            // setNineteenList([...nineteenList, input.current.value]);
            input.current.value = "";
        }
    };

    // const handleNineteenDataRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const handleNineteenRemoveAll = () => {
        setNineteenList([]);
    };

    const handleNineteenRemove = (index) => {
        const list = [...nineteenList];
        list.splice(index, 1);
        setNineteenList(list);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const addToList = e => {
        e.preventDefault();
        if (nineteenList !== null && nineteenList.length !== 0) {
            if (nineteenList !== null && nineteenList.length !== 0 && inputTop.current.value !== 0 && inputBottom.current.value !== 0 && inputTop.current.value.trim() !== "" && inputBottom.current.value.trim() !== "") {
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
            <div className="App">
                <Row>
                    {nineteenList.map((item, b) => (
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
                    <Container>
                        <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: '#D50000' }}>
                            <Container>
                                <Row>
                                    <Col sm={2}>
                                    </Col>
                                    <Col sm></Col>
                                    <Col sm={2}>
                                        {Array.isArray(nineteenList) && nineteenList.length > 0 && (
                                            <Button variant="light" onClick={() => handleNineteenRemoveAll()}>
                                                🗑️ ลบเลขทั้งหมด
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col sm={4}>
                                        <Form.Label style={{ color: 'white' }}>ใส่เลข</Form.Label>
                                        <Form.Control type="number" ref={input} onChange={(e) => handleNineteenChange(e)} placeholder="ระบุเลข" maxLength={2} />
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Label style={{ color: 'white' }}>บน</Form.Label>
                                        <Form.Group controlId="formNumberTop">
                                            <Form.Control name="numberTop"
                                                type="number"
                                                id="numberTop"
                                                ref={inputTop}
                                                maxLength={3}
                                                placeholder="ระบุเลข" />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Label style={{ color: 'white' }}>ล่าง</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Form.Group controlId="formNumberBottom">
                                                <Form.Control name="numberBottom"
                                                    type="number"
                                                    maxLength={3}
                                                    ref={inputBottom}
                                                    id="numberBottom"
                                                    placeholder="ระบุเลข" />
                                            </Form.Group>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={2}>
                                        <Form.Label style={{ color: '#D50000' }}>กลับ</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Button variant="success" type="sumbit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                                🎰 เพิ่มบิล
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                {/* <br />
                                    <Row>
                                        {serviceList.length !== 1 && (
                                            <Button variant="light" onClick={() => handleServiceRemove(index)}>
                                                ลบบิล
                                            </Button>
                                        )}
                                    </Row> */}
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
                                            <h4><b>ราคา : บน {item.top} x ล่าง {item.bottom} x โต๊ด {item.toot}</b></h4>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col sm>
                                    <Button variant="danger" onClick={() => handleNineteenDataRemove(b)}>
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

export default NineteenDoorLottery;