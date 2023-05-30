import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const handleLogout = () => {
        history.push('/');
    };
    return (
        <Navbar style={{ backgroundColor: '#D50000', color: '#FFFFFF' }}>
            <Container>
                <Navbar.Brand href=""><h5 className="text-center" style={{ color: '#FFFFFF' }}>หวยออนไลน์</h5></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="light" onClick={() => handleLogout()}>
                            🚪 ออกจากระบบ
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Header;