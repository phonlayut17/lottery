import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Modal, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState('');
    const [showSpinner, setShowSpinner] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseSpinner = () => {
        setShowSpinner(false);
    };

    const handleShowSpinner = () => {
        setShowSpinner(true);
    };

    const handleValidation = () => {
        let formIsValid = true;

        if (!email.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,22}$/)) {
            formIsValid = false;
            setEmailError("กรุณากรอกผู้ใช้งานโดยมีความยาวอย่างน้อย 4 ตัวและมากที่สุด 22 ตัว");
            return false;
        } else {
            setEmailError("");
        }

        if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,22}$/)) {
            formIsValid = false;
            setPasswordError(
                "กรุณากรอกรหัสผ่านโดยมีความยาวอย่างน้อย 4 ตัวและมากที่สุด 22 ตัว"
            );
            return false;
        } else {
            setPasswordError("");
        }

        return formIsValid;
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            handleShowSpinner();
            try {
                const response = await axios.post('https://luckynumber-777-hhbuvnb5vq-uc.a.run.app/login', { email, password });
                const data = response.data;
                if (data.success) {
                    props.setUser(data.user);
                    props.setUserType(data.user_type);
                    handleCloseSpinner();
                    history.push('/main', { user: data.user, userType: data.user_type });
                    props.onLogin();
                } else {
                    handleCloseSpinner();
                    setShowError('กรอกชื่อผู้ใช้งานและรหัสผ่านให้ถูกต้อง');
                    handleShowModal();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Col align="center">
            <Card style={{ width: '18rem', justifyContent: 'center' }}>
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
            <br />
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Body>
                    <p>{showError}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSpinner} onHide={handleCloseSpinner} centered>
                <Modal.Body align="center">
                    <Spinner animation="border" role="status" />
                    <br />
                    <h4>รอสักครู่...</h4>
                </Modal.Body>
            </Modal>
        </Col>
    );
}

export default Login;
