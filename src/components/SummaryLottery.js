import React from 'react';
import MasterPage from "../pages/MasterPage";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { IoTrashBinOutline } from "react-icons/io5";

const SummaryLottery = ({ summaryList, setSummaryList, setTotal, showList, setShowList, addToSummaryList, minusPrice }) => {

    // const handleServiceRemove = (index) => {
    //     const list = [...summaryList];
    //     list.splice(index, 1);
    //     setSummaryList(list);
    // };

    const handleServiceRemove = (index, price) => {
        const list = [...showList];
        list.splice(index, 1);
        setShowList(list);
        console.log(price);
        minusPrice(price);
    };

    // const showTotal = () => {
    //     addToSummaryList();
    //     setTotal(true);
    // };

    return (
        <MasterPage>
            <Col>
                {/* <Row>
                    <h2 align="center"><b>สรุปรายการ
                        {
                            showList.length > 0 && (
                                <p>&nbsp;</p>
                            )}
                        {
                            showList.length > 0 && (
                                <Button variant="primary" onClick={showTotal}>
                                    🖨️ พิมพ์
                                </Button>
                            )}
                    </b></h2>
                </Row>
                <br /> */}
                {/* <Row>
                    {summaryList.map((item, index) => (
                        <Col key={index} sm={6}>
                            <Row>
                                <Col sm={9}>
                                    <Card fluid className="color-card" style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: index % 2 !== 0 ? '#D50000' : '#FFFFFF' }}>
                                        <Row>
                                            <Col sm>
                                                <h4 style={{ color: index % 2 !== 0 ? 'white' : 'black' }} ><b>ประเภท : {item.type}</b></h4>
                                            </Col>
                                            <Col sm>
                                                <h4 style={{ color: index % 2 !== 0 ? 'white' : 'black' }}><b>เลข : {item.data}</b></h4>
                                            </Col>
                                        </Row>
                                        <br />
                                        <Row sm>
                                            <h4 style={{ color: index % 2 !== 0 ? 'white' : 'black' }}><b>ราคา : {item.amount}</b></h4>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col sm className="text-center">
                                    <Button variant="danger" onClick={() => handleServiceRemove(index)}>
                                        ❌ ลบบิล
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    ))}
                </Row> */}
                <Col>
                    {showList.map((item, index) => (
                        <Row key={index} align="center">
                            <Col sm={4}>
                                {item.id === "1" && (
                                    <h5>2 ตัว</h5>
                                )}
                                {item.id === "2" && (
                                    <h5>3 ตัว</h5>
                                )}
                                {item.id === "3" && (
                                    <h5>3 ตัว</h5>
                                )}
                                {item.id === "4" && (
                                    <h5>2 ตัว</h5>
                                )}
                                {item.id === "5" && (
                                    <h5>เลขวิ่ง</h5>
                                )}
                                {item.id === "6" && (
                                    <h5>วินเลข</h5>
                                )}
                                {item.id === "7" && (
                                    <h5>วินเลข</h5>
                                )}
                                {item.id === "1" && (
                                    <h5>บน x ล่าง</h5>
                                )}
                                {item.id === "2" && (
                                    <h5>บน x ล่าง x โต๊ด</h5>
                                )}
                                {item.id === "3" && (
                                    <h5>บน x ล่าง</h5>
                                )}
                                {item.id === "4" && (
                                    <h5>บน x ล่าง</h5>
                                )}
                                {item.id === "5" && (
                                    <h5>วิ่งบน x วิ่งล่าง</h5>
                                )}
                                {item.id === "6" && (
                                    <h5>บน x ล่าง</h5>
                                )}
                                {item.id === "7" && (
                                    <h5>บน x ล่าง x โต๊ด</h5>
                                )}
                                <b>{item.id === "1" ? `${item.top} x ${item.bottom}` : item.id === "2" ? `${item.top} x ${item.bottom} x ${item.toot}` : item.id === "3" ? `${item.top} x ${item.bottom}` : item.id === "7" ? `${item.top} x ${item.bottom} x ${item.toot}` : `${item.top} x ${item.bottom}`}</b>
                            </Col>

                            <Col sm={6} style={{ backgroundColor: '#FFFFFF' }}>{item.number.join(', ')}</Col>
                            <Col sm style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Row>
                                    <Button variant="danger" onClick={() => handleServiceRemove(index, item.id === "2" || item.id === "7" ? (parseInt(item.top) + parseInt(item.toot)) * item.number.length : (parseInt(item.top) + parseInt(item.bottom)) * item.number.length)}>
                                        ลบ
                                    </Button>
                                </Row>
                                {/* <IoTrashBinOutline size={35} style={{ color: '#D50000' }} onClick={() => handleServiceRemove(index, item.id === "2" || item.id === "7" ? (parseInt(item.top) + parseInt(item.toot)) * item.number.length : (parseInt(item.top) + parseInt(item.bottom)) * item.number.length)} /> */}
                            </Col>
                            <hr></hr>
                        </Row>
                    ))}
                </Col>
            </Col>
        </MasterPage >
    );
}

export default SummaryLottery;
