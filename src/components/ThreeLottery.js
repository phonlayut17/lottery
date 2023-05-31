import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef, useEffect } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const ThreeLottery = (props) => {

    const input = useRef();

    const inputTop = useRef();

    const inputDouble = useRef();

    const [threeList, setThreeList] = useState([]);

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
            setThreeList([...threeList, input.current.value]);
            input.current.value = "";
        }
    };

    // const handleThreeDataRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const handleThreeRemoveAll = () => {
        setThreeList([]);
    };

    const handleThreeRemove = (index) => {
        const list = [...threeList];
        list.splice(index, 1);
        setThreeList(list);
    };

    const addToList = e => {
        e.preventDefault();
        if (threeList !== null && threeList.length !== 0) {
            if (threeList !== null && threeList.length !== 0 && inputTop.current.value !== 0 && inputDouble.current.value !== 0 && inputTop.current.value.trim() !== "" && inputDouble.current.value.trim() !== "") {
                props.setShowList([
                    ...props.showList,
                    {
                        id: "2",
                        number: threeList,
                        top: inputTop.current.value,
                        bottom: 0,
                        toot: inputDouble.current.value
                    }
                ]);
                props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputDouble.current.value), parseInt(threeList.length));
                inputTop.current.value = "";
                inputDouble.current.value = "";
                handleThreeRemoveAll();
            } else if (inputTop.current.value.trim() === "" || inputDouble.current.value.trim() === "") {
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
        "000",
        "111",
        "222",
        "333",
        "444",
        "555",
        "666",
        "777",
        "888",
        "999",
    ]

    const addDoubleToList = () => {
        setThreeList([...threeList, ...dataDoubleSet]);
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

    const convertPositionNumber = () => {
        threeList.forEach((threeData) => {
            if (threeData[0] !== threeData[1] && threeData[0] !== threeData[2] && threeData[1] !== threeData[2]) {
                calculateNumber(threeData, 1);
            } else if (threeData[0] === threeData[1] || threeData[0] === threeData[2] || threeData[1] === threeData[2]) {
                calculateNumber(threeData, 2);
            }
        });
    };

    const calculateNumber = (data, type) => {
        if (type === 1) {
            // setThreeList([...threeList, data[0] + data[1] + data[2]]);
            // threeList.push(data[0] + data[1] + data[2]);
            setThreeList([...threeList, data[0] + data[2] + data[1]]);
            threeList.push(data[0] + data[2] + data[1]);
            setThreeList([...threeList, data[1] + data[0] + data[2]]);
            threeList.push(data[1] + data[0] + data[2]);
            setThreeList([...threeList, data[1] + data[2] + data[0]]);
            threeList.push(data[1] + data[2] + data[0]);
            setThreeList([...threeList, data[2] + data[1] + data[0]]);
            threeList.push(data[2] + data[2] + data[0]);
            setThreeList([...threeList, data[2] + data[0] + data[1]]);
            threeList.push(data[2] + data[0] + data[1]);
        } else if (type === 2) {
            if (data[0] === data[1]) {
                // setThreeList([...threeList, data[0] + data[0] + data[2]]);
                // threeList.push(data[0] + data[0] + data[2]);
                setThreeList([...threeList, data[0] + data[2] + data[0]]);
                threeList.push(data[0] + data[2] + data[0]);
                setThreeList([...threeList, data[2] + data[0] + data[0]]);
                threeList.push(data[2] + data[0] + data[0]);
            } else if (data[1] === data[2]) {
                setThreeList([...threeList, data[2] + data[2] + data[0]]);
                threeList.push(data[2] + data[2] + data[0]);
                setThreeList([...threeList, data[2] + data[0] + data[2]]);
                threeList.push(data[2] + data[0] + data[2]);
                // setThreeList([...threeList, data[0] + data[2] + data[2]]);
                // threeList.push(data[0] + data[2] + data[2]);
            } else {
                setThreeList([...threeList, data[2] + data[2] + data[1]]);
                threeList.push(data[2] + data[2] + data[1]);
                // setThreeList([...threeList, data[2] + data[1] + data[2]]);
                // threeList.push(data[2] + data[1] + data[2]);
                setThreeList([...threeList, data[1] + data[2] + data[2]]);
                threeList.push(data[1] + data[2] + data[2]);
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    return (
        <Col>
            <Row>
                {threeList.map((item, b) => (
                    <Col align="center" sm={1} onClick={() => handleThreeRemove(b)}>
                        <Button variant="danger" onClick={() => handleThreeRemove(b)}>
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
                    <Col align="left" sm>
                        <Button variant="light" onClick={() => addDoubleToList()}>
                            9️⃣9️⃣9️⃣ เลขตอง
                        </Button>
                    </Col>
                    <Col sm></Col>
                    <Col align="right" sm>
                        {Array.isArray(threeList) && threeList.length > 0 && (
                            <Row>
                                <Button variant="light" onClick={() => handleThreeRemoveAll()}>
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
                            <Form.Control type="number" ref={input} onChange={(e) => handleThreeChange(e)} placeholder="ระบุเลข" maxLength={2} />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                        <Form.Group controlId="formNumber">
                            <Row>
                                <Button variant="light" onClick={() => convertPositionNumber()}>
                                    🔁 กลับเลข
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
                                maxLength={3} min={0}
                                placeholder="ระบุเลข" />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'black' }}>โต๊ด</Form.Label>
                        <Form.Group controlId="formNumberDouble">
                            <Form.Control name="numberDouble"
                                type="number"
                                maxLength={3} min={0}
                                ref={inputDouble}
                                id="numberDouble"
                                placeholder="ระบุเลข" />
                        </Form.Group>
                    </Col>
                    <Col sm>
                        <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                        <Row>
                            <Button variant="success" type="sumbit" tabIndex="0" onKeyDown={(e) => handleKeyDown(e)}>
                                🎰 เพิ่มบิล
                            </Button>
                        </Row>
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

export default ThreeLottery;