import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {
    const history = useHistory();
    const handleSearch = () => {
        history.push('/search', { user: props.user, userType: props.userType });
    };
    const handleSum = () => {
        history.push('/sum', { user: props.user, userType: props.userType });
    };
    const handleHome = () => {
        history.push('/main', { user: props.user, userType: props.userType });
    };
    const handleLogout = () => {
        history.push('/');
    };
    const [thaiTime, setThaiTime] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const options = {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: 'Asia/Bangkok',
            };
            const thTime = new Intl.DateTimeFormat('th-TH', options).format(new Date());
            setThaiTime(thTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <Navbar style={{ backgroundColor: '#D50000', color: '#FFFFFF' }}>
            <Container>
                <Navbar.Brand href="">
                    <h5 className="text-center" style={{ color: '#FFFFFF' }} onClick={handleHome} >หวยออนไลน์ - {thaiTime}</h5>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={"สวัสดีคุณ - " + props.user} id="basic-nav-dropdown">
                        {props.userType === "ad" ? (
                            <>
                                <NavDropdown.Item onClick={handleSearch}>🔍 ค้นหา</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleSum}>📝 สรุป</NavDropdown.Item>
                            </>
                        ) : (
                            <p></p>
                        )}
                        <NavDropdown.Item onClick={handleLogout}>🚪 ออกจากระบบ</NavDropdown.Item>
                    </NavDropdown>

                    {/* <div className="d-flex align-items-center">
                        <h6 className="mr-3">สวัสดีคุณ - {props.user}</h6> &nbsp;
                        {props.userType === "ad" ? (
                            <Navbar.Text>
                                <Button variant="light" onClick={handleSearch}>
                                    🔍 ค้นหา
                                </Button>
                                &nbsp;
                                <Button variant="light" onClick={handleSum}>
                                    📝 สรุป
                                </Button>
                            </Navbar.Text>
                        ) : (
                            <p></p>
                        )}
                        &nbsp;
                        <Navbar.Text>
                            <Button variant="light" onClick={handleLogout}>
                                🚪 ออกจากระบบ
                            </Button>
                        </Navbar.Text>
                    </div> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Header;