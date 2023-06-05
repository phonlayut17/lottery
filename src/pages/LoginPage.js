import React from 'react';
import Container from 'react-bootstrap/Container';
import Login from '../components/Login';
import { useHistory } from 'react-router-dom';

function LoginPage({ setIsLoggedIn, user, setUser, userType, setUserType }) {
    const history = useHistory();

    const handleLogin = () => {
        setIsLoggedIn(true);
        history.push('/main');
        setUser(user);
        setUserType(userType);
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
            <Login onLogin={handleLogin} user={user} setUser={setUser} userType={userType} setUserType={setUserType} />
        </Container>
    );
}

export default LoginPage;
