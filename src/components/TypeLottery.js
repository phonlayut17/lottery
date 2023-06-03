import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import laos from '../images/laos.png';
import laosVip from '../images/laos-vip.png';
import vietnam from '../images/vietnam.png';
import vietnamPrivilege from '../images/vietnam-privilege.png';
import vietnamVip from '../images/vietnam-vip.png';

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
                            <option value="hanoi-normal">ฮานอย 🇻🇳</option>
                            <option value="hanoi-vip">ฮานอย VIP 🇻🇳 🅥🅘🅟</option>
                            <option value="lao-normal">ลาวพัฒนา 🇱🇦</option>
                            <option value="lao-vip">ลาว VIP 🇱🇦 🅥🅘🅟</option>
                        </Form.Select>
                    </form>
                </Row>
                <br />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h4>
                        [หวยต่างประเทศ] - &nbsp;
                        {myLottery === "hanoi-normal" ? "ฮานอย" :
                            myLottery === "hanoi-privilege" ? "ฮานอย พิเศษ" :
                                myLottery === "hanoi-vip" ? "ฮานอย VIP" :
                                    myLottery === "lao-normal" ? "ลาวพัฒนา" :
                                        "ลาว VIP"}
                    </h4>
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
                        width={60}
                        height={60}
                    />
                </div>
            </Col>
        </Container>
    );
}

export default TypeLottery;