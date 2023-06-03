import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import laos from '../images/laos.png';
import laosVip from '../images/laos-vip.png';
import vietnam from '../images/vietnam.png';
import vietnamPrivilege from '../images/vietnam-privilege.png';
import vietnamVip from '../images/vietnam-vip.png';
import Button from 'react-bootstrap/Button';

const Comment = (props) => {

    const inputComment = useRef();

    const handleCommentChange = () => {
        // props.setComment([...props.comment, inputComment.current.value]);
    }

    const removeAll = () => {
        props.setShowList([]);
        props.clearPrice();
        props.clearAll();
    };

    return (
        <Col>
            <Row>
                <Col sm={2}>
                    <h4 align="right" style={{ color: 'black' }}>หมายเหตุ</h4>
                </Col>
                <Col sm={8}>
                    <Row>
                        <Form.Group controlId="formComment">
                            <Form.Control name="comment"
                                type="text"
                                id="comment"
                                ref={inputComment}
                                onChange={handleCommentChange()}
                                placeholder="" />
                        </Form.Group>
                    </Row>
                </Col>
                <Col sm>
                    {/* {
                        <h2 align="left">{props.lotteryType === "hanoi-normal" ? "🇻🇳" : props.lotteryType === "hanoi-privilege" ? "🇻🇳 🅟🅡🅘" : props.lotteryType === "hanoi-vip" ? "🇻🇳 🅥🅘🅟" : props.lotteryType === "lao-normal" ? "🇱🇦" : props.lotteryType === "lao-vip" ? "🇱🇦 🅥🅘🅟" : ""}</h2>
                    } */}
                    {<img align="top" src={props.lotteryType === "hanoi-normal" ? vietnam : props.lotteryType === "hanoi-privilege" ? vietnamPrivilege : props.lotteryType === "hanoi-vip" ? vietnamVip : props.lotteryType === "lao-normal" ? laos : props.lotteryType === "lao-vip" ? laosVip : ""} alt="" width={40} height={40} />}
                </Col>
            </Row>
            <br />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3 align="center">
                    [หวยต่างประเทศ] - &nbsp;
                    {props.lotteryType === "hanoi-normal" ? "ฮานอย" :
                        props.lotteryType === "hanoi-privilege" ? "ฮานอย พิเศษ" :
                            props.lotteryType === "hanoi-vip" ? "ฮานอย VIP" :
                                props.lotteryType === "lao-normal" ? "ลาวพัฒนา" :
                                    "ลาว VIP"}
                </h3>
                &nbsp;
                <img
                    align="top"
                    src={
                        props.lotteryType === "hanoi-normal" ? vietnam :
                            props.lotteryType === "hanoi-privilege" ? vietnamPrivilege :
                                props.lotteryType === "hanoi-vip" ? vietnamVip :
                                    props.lotteryType === "lao-normal" ? laos :
                                        props.lotteryType === "lao-vip" ? laosVip : ""
                    }
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
            <br />
            <Container style={{ backgroundColor: '#ffffff' }}>
                <Row>
                    <h2 align="center"><b>รวม {props.price} บาท</b></h2>
                </Row>
            </Container>
            <br />
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Button variant="danger" onClick={() => removeAll()}>
                        ล้างตาราง
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary">
                        บันทึก
                    </Button>
                </Col>
            </Row>
        </Col>
    );
}

export default Comment;