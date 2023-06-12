import Header from "../../src/components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useLocation } from 'react-router-dom';

import TwoSummary from "../../src/components/TwoSummary";
import ThreeSummary from "../../src/components/ThreeSummary";

function SumPage(props) {
    const [key, setKey] = useState('2');
    const location = useLocation();
    const { user, userType } = location.state || {};

    const handleTabSelect = (k) => {
        setKey(k);
    };

    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header user={user} userType={userType} />
            </header>
            <body>
                <Col>
                    <Row style={{ paddingTop: 100, paddingLeft: 16, paddingRight: 16 }} className="d-flex align-items-center row">
                        <div className="mb-3">
                            <Button
                                variant={key === '2' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('2')}
                                style={{ marginRight: '8px' }}
                            >
                                2 ตัว
                            </Button>
                            <Button
                                variant={key === '3' ? 'danger' : 'light'}
                                onClick={() => handleTabSelect('3')}
                                style={{ marginRight: '8px' }}
                            >
                                3 ตัว
                            </Button>
                        </div>
                    </Row>
                    <Container fluid>
                        <div className="">
                            {key === '2' && <TwoSummary />}
                            {key === '3' && <ThreeSummary />}
                        </div>
                    </Container>
                </Col>
            </body>
        </>
    );
}

export default SumPage;
