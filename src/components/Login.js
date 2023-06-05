import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Login(props) {
    const [password, setPassword] = useState("godofwebsite777");
    const [email, setEmail] = useState("admin777");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");

    const handleValidation = () => {
        let formIsValid = true;

        if (!email.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,22}$/)) {
            // if (email !== 'admin') {
            formIsValid = false;
            setemailError("กรุณากรอกผู้ใช้งานโดยมีความยาวอย่างน้อย 4 ตัวและมากที่สุด 22 ตัว");
            return false;
        } else {
            setemailError("");
            formIsValid = true;
        }

        if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,22}$/)) {
            // if (password !== '1234') {
            formIsValid = false;
            setpasswordError(
                "กรุณากรอกรหัสผ่านโดยมีความยาวอย่างน้อย 4 ตัวและมากที่สุด 22 ตัว"
            );
            return false;
        } else {
            setpasswordError("");
            formIsValid = true;
        }

        return formIsValid;
    };

    // const loginSubmit = (e) => {
    //     e.preventDefault();
    //     if (handleValidation()) {
    //         // Call the onLogin function passed from the LoginPage
    //         onLogin();
    //     }
    // };

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const response = await axios.post('http://localhost:8081/login', { email, password });
                const data = response.data;
                props.setUser(data.user);
                props.setUserType(data.user_type);
                props.onLogin();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <form id="loginform" onSubmit={loginSubmit}>
                    <div className="form-group">
                        <h4>🤵🏻 ผู้ใช้งาน</h4>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="ระบุผู้ใช้งาน"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <small id="emailHelp" className="text-danger form-text">
                            {emailError}
                        </small>
                    </div>
                    <br />
                    <div className="form-group">
                        <h4>🔐 รหัสผ่าน</h4>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            placeholder="ระบุรหัสผ่าน"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <small id="passworderror" className="text-danger form-text">
                            {passwordError}
                        </small>
                    </div>
                    <br />
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <button type="submit" className="btn btn-danger">
                                🌙 เข้าสู่ระบบ
                            </button>
                        </Col>
                    </Row>
                </form>
            </Card.Body>
        </Card>
    );
}

export default Login;
