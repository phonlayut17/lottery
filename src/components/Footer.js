import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';

function Footer() {
    const [currentDateTimeString, setCurrentDateTimeString] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDateTime = new Date();
            const formattedDateTimeString = currentDateTime.toLocaleString('th-TH');
            setCurrentDateTimeString(formattedDateTimeString);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Navbar style={{ backgroundColor: '#D50000', color: '#FFFFFF' }}>
            <Container>
                <Navbar.Brand href="">
                    <Navbar.Text style={{ color: '#FFFFFF' }}>
                        {currentDateTimeString}
                    </Navbar.Text>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{ color: '#FFFFFF' }}>
                        © CopyRight License Ngxd 2023
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Footer;