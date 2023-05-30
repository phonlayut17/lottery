import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const Comment = (props) => {

    const inputComment = useRef();

    const handleCommentChange = () => {
        // props.setComment([...props.comment, inputComment.current.value]);
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
                    {
                        <h2 align="left">{props.lotteryType === "hanoi-normal" ? "🇻🇳" : props.lotteryType === "hanoi-privilege" ? "🇻🇳 🅟🅡🅘" : props.lotteryType === "hanoi-vip" ? "🇻🇳 🅥🅘🅟" : props.lotteryType === "lao-normal" ? "🇱🇦" : props.lotteryType === "lao-vip" ? "🇱🇦 🅥🅘🅟" : ""}</h2>
                    }
                </Col>
            </Row>
            <br />
            <Row>
                <h3 align="center"><b>{props.lotteryType === "hanoi-normal" ? "หวยฮานอย ปกติ 🇻🇳" : props.lotteryType === "hanoi-privilege" ? "หวยฮานอย พิเศษ 🇻🇳" : props.lotteryType === "hanoi-vip" ? "หวยฮานอย VIP 🇻🇳" : props.lotteryType === "lao-normal" ? "หวยลาวปกติ 🇱🇦" : props.lotteryType === "lao-vip" ? "หวยลาว VIP 🇱🇦" : ""}</b></h3>
            </Row>
            <br />
            <Container style={{ backgroundColor: '#ffffff' }}>
                <Row>
                    <h2 align="center"><b>รวม {props.price} บาท</b></h2>
                </Row>
            </Container>
        </Col>
    );
}

export default Comment;