import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header(props) {
    const history = useHistory();
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
                    <h5 className="text-center" style={{ color: '#FFFFFF' }}>หวยออนไลน์ - {thaiTime}</h5>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <div className="d-flex align-items-center">
                        <h6 className="mr-3">สวัสดีคุณ - {props.user}</h6> &nbsp;
                        <Navbar.Text>
                            <Button variant="light" onClick={handleLogout}>
                                🚪 ออกจากระบบ
                            </Button>
                        </Navbar.Text>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Header;