import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const TypeLottery = (props) => {

    const [myLottery, setLottery] = useState("hanoi-privilege");

    const setLotteryType = (event) => {
        const getLottery = event.target.value;
        setLottery(getLottery);
        props.setLotteryType(getLottery);
        console.log(props.lotteryType);
    }

    return (
        <Container>
            <Col>
                <h2 align="center">ประเภทหวย</h2>
                <br />
                <h4 align="start">ประเภทหวย</h4>
                <Row>
                    <form controlId="winnerType">
                        <Form.Select value={myLottery} className="form-control" onChange={(e) => (setLotteryType(e))}>
                            <option value="">--กรุณาเลือกประเภท--</option>
                            <option value="hanoi-privilege">ฮานอย พิเศษ 🇻🇳</option>
                            <option value="hanoi-normal">ฮานอย ปกติ 🇻🇳</option>
                            <option value="hanoi-vip">ฮานอย VIP 🇻🇳 🅥🅘🅟</option>
                            <option value="lao-normal">ลาว ปกติ 🇱🇦</option>
                            <option value="lao-vip">ลาว VIP 🇱🇦 🅥🅘🅟</option>
                        </Form.Select>
                    </form>
                </Row>
                <br />
                <h4 align="start">แทงเร็ว</h4>
                <br />
                <h4 align="left">[หวยรายวัน] {myLottery === "hanoi-normal" ? "ฮานอย ปกติ 🇻🇳" : myLottery === "hanoi-privilege" ? "ฮานอย พิเศษ 🇻🇳" : myLottery === "hanoi-vip" ? "ฮานอย VIP 🇻🇳 🅥🅘🅟" : myLottery === "lao-normal" ? "ลาว ปกติ 🇱🇦" : "ลาว VIP 🇱🇦 🅥🅘🅟"}</h4>
            </Col>
        </Container>
    );
}

export default TypeLottery;