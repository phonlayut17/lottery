import React from 'react';
import Container from 'react-bootstrap/Container';
import Login from '../components/Login';
import { useHistory } from 'react-router-dom';

function LoginPage({ isLoggedIn, setIsLoggedIn }) {
    const history = useHistory();

    const handleLogin = () => {
        // Perform login logic here
        // For example, check username and password against a database or API

        // Simulating a successful login
        setIsLoggedIn(true);
        history.push('/lottery');
    };

    return (
        <Container
            fluid
            className='bg-login'
            style={{
                paddingTop: 16,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',

            }}
        >
            <Login onLogin={handleLogin} />
        </Container>
    );
}

export default LoginPage;
