import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const SixBackLottery = (props) => {

    const input = useRef();

    const inputTop = useRef();

    const [sixList, setSixList] = useState([]);

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
            setSixList([...sixList, input.current.value]);
            let data = input.current.value;
            if (data.charAt(0) !== data.charAt(1) && data.charAt(0) !== data.charAt(2) && data.charAt(1) !== data.charAt(2)) {
                convertPositionNumber(data, 1);
            } else if (data.charAt(0) === data.charAt(1) || data.charAt(0) === data.charAt(2) || data.charAt(1) === data.charAt(2)) {
                convertPositionNumber(data, 2);
            }
            input.current.value = "";
        }
    };

    const handleSixRemoveAll = () => {
        setSixList([]);
    };

    const handleSixRemove = (index) => {
        const list = [...sixList];
        list.splice(index, 1);
        setSixList(list);
    };

    // const handleSixDataRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const addToList = e => {
        e.preventDefault();
        if (sixList !== null && sixList.length !== 0) {
            if (sixList !== null && sixList.length !== 0 && inputTop.current.value !== 0 && inputTop.current.value.trim() !== "") {
                props.setShowList([
                    ...props.showList,
                    {
                        id: "3",
                        number: sixList,
                        top: inputTop.current.value,
                        bottom: 0,
                        toot: 0
                    }
                ]);
                props.calculatePrice(parseInt(inputTop.current.value), parseInt(sixList.length));
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
            setSixList([...sixList, data[0] + data[1] + data[2]]);
            sixList.push(data[0] + data[1] + data[2]);
            setSixList([...sixList, data[0] + data[2] + data[1]]);
            sixList.push(data[0] + data[2] + data[1]);
            setSixList([...sixList, data[1] + data[0] + data[2]]);
            sixList.push(data[1] + data[0] + data[2]);
            setSixList([...sixList, data[1] + data[2] + data[0]]);
            sixList.push(data[1] + data[2] + data[0]);
            setSixList([...sixList, data[2] + data[1] + data[0]]);
            sixList.push(data[2] + data[2] + data[0]);
            setSixList([...sixList, data[2] + data[0] + data[1]]);
            sixList.push(data[2] + data[0] + data[1]);
        } else if (type === 2) {
            if (data[0] === data[1]) {
                setSixList([...sixList, data[0] + data[0] + data[2]]);
                sixList.push(data[0] + data[0] + data[2]);
                setSixList([...sixList, data[0] + data[2] + data[0]]);
                sixList.push(data[0] + data[2] + data[0]);
                setSixList([...sixList, data[2] + data[0] + data[0]]);
                sixList.push(data[2] + data[0] + data[0]);
            } else if (data[1] === data[2]) {
                setSixList([...sixList, data[2] + data[2] + data[0]]);
                sixList.push(data[2] + data[2] + data[0]);
                setSixList([...sixList, data[2] + data[0] + data[2]]);
                sixList.push(data[2] + data[0] + data[2]);
                setSixList([...sixList, data[0] + data[2] + data[2]]);
                sixList.push(data[0] + data[2] + data[2]);
            } else {
                setSixList([...sixList, data[2] + data[2] + data[1]]);
                sixList.push(data[2] + data[2] + data[1]);
                setSixList([...sixList, data[2] + data[1] + data[2]]);
                sixList.push(data[2] + data[1] + data[2]);
                setSixList([...sixList, data[1] + data[2] + data[2]]);
                sixList.push(data[1] + data[2] + data[2]);
            }
        }
    };


    return (
        <Col>
            <div className="App">
                <Row>
                    {sixList.map((item, b) => (
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
                    <Container>
                        <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: '#D50000' }}>
                            <Container>
                                <Row>
                                    <Col sm={2}>
                                    </Col>
                                    <Col sm></Col>
                                    <Col sm={2}>
                                        {Array.isArray(sixList) && sixList.length > 0 && (
                                            <Button variant="light" onClick={() => handleSixRemoveAll()}>
                                                🗑️ ลบเลขทั้งหมด
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col sm={5}>
                                        <Form.Label style={{ color: 'white' }}>ใส่เลข</Form.Label>
                                        <Form.Group controlId="formNumber">
                                            <Form.Control type="number" ref={input} onChange={(e) => handleThreeChange(e)} placeholder="ระบุเลข" maxLength={2} />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={5}>
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
                                    <Button variant="danger" onClick={() => handleSixDataRemove(b)}>
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

export default SixBackLottery;