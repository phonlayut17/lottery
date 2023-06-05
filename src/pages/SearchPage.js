import Header from "../../src/components/Header";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function SearchPage(props) {
    const inputSearch = useRef();
    const inputDateFrom = useRef();
    const inputDateTo = useRef();

    useEffect(() => {
        const getCurrentDateFormatted = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        // Set the initial value of inputDateFrom and inputDateTo
        inputDateFrom.current.value = getCurrentDateFormatted();
        inputDateTo.current.value = getCurrentDateFormatted();
    }, []);

    const handleDateChange = () => {
        const fromDate = inputDateFrom.current.value;
        const toDate = inputDateTo.current.value;

        // Set the minimum date for inputDateTo based on inputDateFrom
        inputDateTo.current.min = fromDate;

        console.log('From:', fromDate);
        console.log('To:', toDate);
    };

    return (
        <>
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Header user={props.user} userType={props.userType} />
            </header>
            <body>
                <Col>
                    <Row style={{ paddingTop: 100, paddingLeft: 16, paddingRight: 16 }}>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>ใส่เลข</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="text"
                                    min={0}
                                    ref={inputSearch}
                                    placeholder="ระบุเลข"
                                    autoFocus
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>วันที่เริ่ม</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputDateFrom}
                                    placeholder="ระบุวันที่"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Label style={{ color: 'black' }}>วันที่สิ้นสุด</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Form.Control
                                    type="date"
                                    ref={inputDateTo}
                                    placeholder="ระบุวันที่"
                                    onChange={handleDateChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={1}>
                            <Form.Label style={{ color: 'transparent' }}>กลับ</Form.Label>
                            <Form.Group controlId="formNumber">
                                <Button variant="primary">
                                    🔍 ค้นหา
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <table class="table table-striped">
                        <thead class="text-center">
                            <tr>
                                <th scope="col"><h4>บิล</h4></th>
                                <th scope="col"><h4>ประเภทหวย</h4></th>
                                <th scope="col"><h4>เลขหวย</h4></th>
                                <th scope="col"><h4>ประเภทราคา</h4></th>
                                <th scope="col"><h4>ราคา</h4></th>
                                <th scope="col"><h4>พนักงาน</h4></th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr>
                                <td colspan="7">❌ ยังไม่เปิดใช้งาน ❌</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            </body>
        </>
    );
}

export default SearchPage;
