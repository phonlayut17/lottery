import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState, useRef } from 'react';
import { Modal } from "react-bootstrap";

import '../index.js';
const WinNummberLottery = (props) => {

    const inputTop = useRef();

    const inputDouble = useRef();

    const [twoList, setTwoList] = useState([]);

    const [threeList, setThreeList] = useState([]);

    const [winList, setWinList] = useState([]);

    // const [setNewListItem] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showError, setShowError] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleTwoRemove = (index) => {
        const list = [...twoList];
        list.splice(index, 1);
        setTwoList(list);
    };

    // const handleWinNumberDataRemove = (index) => {
    //     const list = [...newListItem];
    //     list.splice(index, 1);
    //     setNewListItem(list);
    // };

    const handleRemoveAll = () => {
        setTwoList([]);
        setThreeList([]);
    };

    const handleThreeRemove = (index) => {
        const list = [...threeList];
        list.splice(index, 1);
        setThreeList(list);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            addToList(e);
        }
    };

    const addToList = e => {
        e.preventDefault();
        if (myLottery === 'Two') {
            if (twoList !== null && twoList.length !== 0) {
                if (twoList !== null && twoList.length !== 0 && inputTop.current.value !== 0 && inputDouble.current.value !== 0 && inputTop.current.value.trim() !== "" && inputDouble.current.value.trim() !== "") {
                    props.setShowList([
                        ...props.showList,
                        {
                            id: "6",
                            number: twoList,
                            top: inputTop.current.value,
                            bottom: inputDouble.current.value,
                            toot: 0
                        }
                    ]);
                    props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputDouble.current.value), parseInt(twoList.length));
                    inputTop.current.value = "";
                    inputDouble.current.value = "";
                    handleRemoveAll();
                } else if (inputTop.current.value.trim() === "" || inputDouble.current.value.trim() === "") {
                    setShowError(...showError, 'กรุณากรอกราคาที่จะเล่น');
                    handleShowModal();
                }
            } else {
                setShowError(...showError, 'กรุณากรอกเลขที่จะเล่น');
                handleShowModal();
            }
        } else {
            if (threeList !== null && threeList.length !== 0) {
                if (threeList !== null && threeList.length !== 0 && inputTop.current.value !== 0 && inputDouble.current.value !== 0) {
                    props.setShowList([
                        ...props.showList,
                        {
                            id: "7",
                            number: threeList,
                            top: inputTop.current.value,
                            bottom: 0,
                            toot: inputDouble.current.value,
                        }
                    ]);
                    props.calculatePrice(parseInt(inputTop.current.value) + parseInt(inputDouble.current.value), parseInt(threeList.length));
                    inputTop.current.value = "";
                    inputDouble.current.value = "";
                    handleRemoveAll();
                } else if (inputTop.current.value.trim() === "" || inputDouble.current.value.trim() === "") {
                    setShowError(...showError, 'กรุณากรอกราคาที่จะเล่น');
                    handleShowModal();
                }
            } else {
                // Handle the case when twoList is not an array
                setShowError(...showError, 'กรุณากรอกเลขที่จะเล่น');
                handleShowModal();
            }
        }
    };

    const addDoubleToList = (matchingData) => {
        const updatedTwoList = [...matchingData];

        winList.forEach((winData) => {
            const doubleData = winData + winData;
            updatedTwoList.push(doubleData);
        });

        setTwoList(updatedTwoList);
    };

    const addTripleToList = (matchingData) => {
        const updatedThreeList = [...matchingData];

        winList.forEach((winData) => {
            const tripleData = winData + winData + winData;
            updatedThreeList.push(tripleData);
        });

        setThreeList(updatedThreeList);
    };

    const convertPositionNumber = () => {
        if (myLottery === 'Two') {
            twoList.forEach((twoData) => {
                if (twoData[0] !== twoData[1] || twoData[1] !== twoData[0]) {
                    calculateNumber(twoData, 3);
                }
            });
        } else {
            threeList.forEach((threeData) => {
                if (threeData[0] !== threeData[1] && threeData[0] !== threeData[2] && threeData[1] !== threeData[2]) {
                    calculateNumber(threeData, 1);
                }
                else if (threeData[0] === threeData[1] && threeData[0] === threeData[2] && threeData[1] === threeData[2]) {
                    return;
                }
                else if (threeData[0] === threeData[1] || threeData[0] === threeData[2] || threeData[1] === threeData[2]) {
                    calculateNumber(threeData, 2);
                }
            });
        }
    };

    const calculateNumber = (data, type) => {
        if (type === 1) {
            setThreeList([...threeList, data[0] + data[1] + data[2]]);
            threeList.push(data[0] + data[1] + data[2]);
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
        } else if (type === 3) {
            setTwoList([...twoList, data[1] + data[0]]);
            twoList.push(data[1] + data[0]);
        }
    }

    const totalNumber = () => {
        if (myLottery === 'Two' && winList.length >= 2 && winList.length <= 7) {
            twoMatching();
        } else if (myLottery === 'Three' && winList.length >= 3 && winList.length <= 7) {
            threeMatching();
        }
    }

    const twoMatching = () => {
        const matchingData = [];

        for (let i = 0; i < winList.length; i++) {
            for (let j = i + 1; j < winList.length; j++) {
                const twoData = winList[i] + winList[j];
                matchingData.push(twoData);

                // Add the reverse combination as well
                const reverseTwoData = winList[j] + winList[i];
                matchingData.push(reverseTwoData);
            }
        }

        if (myLottery === 'Two') {
            addDoubleToList(matchingData);
        } else {
            setTwoList([...matchingData]);
        }
    };

    const threeMatching = () => {
        const matchingData = [];

        for (let i = 0; i < winList.length; i++) {
            for (let j = i + 1; j < winList.length; j++) {
                for (let k = j + 1; k < winList.length; k++) {
                    const threeData = winList[i] + winList[j] + winList[k];
                    matchingData.push(threeData);
                }
            }
        }

        if (myLottery === 'Three') {
            addTripleToList(matchingData);
        } else {
            setThreeList([...matchingData]);
        }
    };

    const [myLottery, setLottery] = useState("Two");

    const setLotteryType = (event) => {
        const getLottery = event.target.value;
        setLottery(getLottery);
        setTwoList([]);
        setThreeList([]);
    }

    const [myDouble, setDouble] = useState("Yes");

    const setDoubleType = (event) => {
        const getDouble = event.target.value;
        setDouble(getDouble);
    }

    const listNumberRemove = (data) => {
        setWinList(winList => {
            return winList.filter(number => number !== data)
        });
    };

    const [zero, setZero] = useState(false);

    const setStateZero = () => {
        if (zero === true) {
            setZero(false);
            listNumberRemove("0");
        } else {
            setZero(true);
            setWinList([...winList, "0"]);
            winList.push("0");
        }
    }

    const [one, setOne] = useState(false);

    const setStateOne = () => {
        if (one === true) {
            setOne(false);
            listNumberRemove("1");
        } else {
            setOne(true);
            setWinList([...winList, "1"]);
            winList.push("1");
        }
    }

    const [two, setTwo] = useState(false);

    const setStateTwo = () => {
        if (two === true) {
            setTwo(false);
            listNumberRemove("2");
        } else {
            setTwo(true);
            setWinList([...winList, "2"]);
            winList.push("2");
        }
    }

    const [three, setThree] = useState(false);

    const setStateThree = () => {
        if (three === true) {
            setThree(false);
            listNumberRemove("3");
        } else {
            setThree(true);
            setWinList([...winList, "3"]);
            winList.push("3");
        }
    }

    const [four, setFour] = useState(false);

    const setStateFour = () => {
        if (four === true) {
            setFour(false);
            listNumberRemove("4");
        } else {
            setFour(true);
            setWinList([...winList, "4"]);
            winList.push("4");
        }
    }

    const [five, setFive] = useState(false);

    const setStateFive = () => {
        if (five === true) {
            setFive(false);
            listNumberRemove("5");
        } else {
            setFive(true);
            setWinList([...winList, "5"]);
            winList.push("5");
        }
    }

    const [six, setSix] = useState(false);

    const setStateSix = () => {
        if (six === true) {
            setSix(false);
            listNumberRemove("6");
        } else {
            setSix(true);
            setWinList([...winList, "6"]);
            winList.push("6");
        }
    }

    const [seven, setSeven] = useState(false);

    const setStateSeven = () => {
        if (seven === true) {
            setSeven(false);
            listNumberRemove("7");
        } else {
            setSeven(true);
            setWinList([...winList, "7"]);
            winList.push("7");
        }
    }

    const [eight, setEight] = useState(false);

    const setStateEight = () => {
        if (eight === true) {
            setEight(false);
            listNumberRemove("8");
        } else {
            setEight(true);
            setWinList([...winList, "8"]);
            winList.push("8");
        }
    }

    const [nine, setNine] = useState(false);

    const setStateNine = () => {
        if (nine === true) {
            setNine(false);
            listNumberRemove("9");
        } else {
            setNine(true);
            setWinList([...winList, "9"]);
            winList.push("9");
        }
    }

    return (
        <Container>
            <Col>
                <div className="App">
                    <Row>
                        <Col sm={6}>
                            <h4 align="start">ประเภทเลข</h4>
                            <Row>
                                <form controlId="winnerType">
                                    <Form.Select value={myLottery} className="form-control" onChange={(e) => (setLotteryType(e))}>
                                        <option value="">--กรุณาเลือกประเภท--</option>
                                        <option value="Two">จับวิน 2 ตัว</option>
                                        <option value="Three">จับวิน 3 ตัว</option>
                                    </Form.Select>
                                </form>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <h4 align="start">ประเภทเบิ้ล</h4>
                            <Row>
                                <form controlId="doubleType">
                                    <Form.Select value={myDouble} onChange={(e) => (setDoubleType(e))}>
                                        <option value="">--กรุณาเลือกประเภท--</option>
                                        <option value="No">จับวินไม่รวมเบิ้ล</option>
                                        <option value="Yes">จับวินรวมเบิ้ล</option>
                                    </Form.Select>
                                </form>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    {
                        myLottery === 'Two' && (
                            <h4 align="start">กรุณาเลือกเลขวิน 2-7 ตัว</h4>
                        )}

                    {
                        myLottery === 'Three' && (
                            <h4 align="start">กรุณาเลือกเลขวิน 3-7 ตัว</h4>
                        )}
                    <br />
                    <Row>
                        <Col sm>
                            <Card style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: zero === true ? '#D50000' : '#FFFFFF' }} onClick={setStateZero}>
                                <h4 key={0} align="center" style={{ color: zero === true ? '#FFFFFF' : '#D50000' }}>0</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: one === true ? '#D50000' : '#FFFFFF' }} onClick={setStateOne}>
                                <h4 key={1} align="center" style={{ color: one === true ? '#FFFFFF' : '#D50000' }}>1</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: two === true ? '#D50000' : '#FFFFFF' }} onClick={setStateTwo}>
                                <h4 key={2} align="center" style={{ color: two === true ? '#FFFFFF' : '#D50000' }}>2</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: three === true ? '#D50000' : '#FFFFFF' }} onClick={setStateThree}>
                                <h4 key={3} align="center" style={{ color: three === true ? '#FFFFFF' : '#D50000' }}>3</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: four === true ? '#D50000' : '#FFFFFF' }} onClick={setStateFour}>
                                <h4 key={4} align="center" style={{ color: four === true ? '#FFFFFF' : '#D50000' }}>4</h4>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: five === true ? '#D50000' : '#FFFFFF' }} onClick={setStateFive}>
                                <h4 key={5} align="center" style={{ color: five === true ? '#FFFFFF' : '#D50000' }}>5</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: six === true ? '#D50000' : '#FFFFFF' }} onClick={setStateSix}>
                                <h4 key={6} align="center" style={{ color: six === true ? '#FFFFFF' : '#D50000' }}>6</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: seven === true ? '#D50000' : '#FFFFFF' }} onClick={setStateSeven}>
                                <h4 key={7} align="center" style={{ color: seven === true ? '#FFFFFF' : '#D50000' }}>7</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: eight === true ? '#D50000' : '#FFFFFF' }} onClick={setStateEight}>
                                <h4 key={8} align="center" style={{ color: eight === true ? '#FFFFFF' : '#D50000' }}>8</h4>
                            </Card>
                        </Col>
                        <Col sm>
                            <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: nine === true ? '#D50000' : '#FFFFFF' }} onClick={setStateNine}>
                                <h4 key={9} align="center" style={{ color: nine === true ? '#FFFFFF' : '#D50000' }}>9</h4>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        {twoList.map((item, b) => (
                            <Col sm={1}>
                                <Button variant="danger" onClick={() => handleTwoRemove(b)}>
                                    {item}
                                </Button>
                                <br />
                                <br />
                            </Col>
                        ))}
                    </Row>
                    <br />
                    <Row>
                        {threeList.map((item, b) => (
                            <Col sm={1}>
                                <Button variant="danger" onClick={() => handleThreeRemove(b)}>
                                    {item}
                                </Button>
                                <br />
                                <br />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col sm={2}>
                            <Button variant="light" onClick={() => totalNumber()}>
                                🧮 คำนวณ
                            </Button>
                        </Col>
                        <Col sm={2}>
                            <Button variant="light" onClick={() => convertPositionNumber()}>
                                🔁 กลับเลขวิน
                            </Button>
                        </Col>
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
                                            {Array.isArray(twoList) && twoList.length > 0 && (
                                                <Button variant="light" onClick={() => handleRemoveAll()}>
                                                    🗑️ ลบเลขทั้งหมด
                                                </Button>
                                            )}
                                            {Array.isArray(threeList) && threeList.length > 0 && (
                                                <Button variant="light" onClick={() => handleRemoveAll()}>
                                                    🗑️ ลบเลขทั้งหมด
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
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
                                        <Col sm={5}>
                                            {
                                                myLottery === 'Two' && (
                                                    <Form.Label style={{ color: 'white' }}>ล่าง</Form.Label>
                                                )
                                            }
                                            {
                                                myLottery === 'Three' && (
                                                    <Form.Label style={{ color: 'white' }}>โต๊ด</Form.Label>
                                                )
                                            }
                                            <Form.Group controlId="formNumberDouble">
                                                <Form.Control name="numberDouble"
                                                    type="number"
                                                    maxLength={3}
                                                    ref={inputDouble}
                                                    id="numberDouble"
                                                    placeholder="ระบุเลข" />
                                            </Form.Group>
                                        </Col>
                                        <Col sm>
                                            <Form.Label style={{ color: '#D50000' }}>กลับ</Form.Label>
                                            <Form.Group controlId="formNumber">
                                                <Button variant="success" type="sumbit" onKeyDown={(e) => handleKeyDown(e)}>
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
                                    <Button variant="danger" onClick={() => handleWinNumberDataRemove(b)}>
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
        </Container>
    );
}

export default WinNummberLottery;