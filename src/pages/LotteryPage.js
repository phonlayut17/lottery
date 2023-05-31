import React, { useState } from 'react';
import Header from "../../src/components/Header";
// import Footer from "../../src/components/Footer";
import TwoLottery from "../../src/components/TwoLottery";
import ThreeLottery from "../../src/components/ThreeLottery";
import SixBackLottery from "../../src/components/SixBackLottery";
import NineteenDoorLottery from "../../src/components/NineteenDoorLottery";
import NumberRunLottery from "../../src/components/NumberRunLottery";
// import WinNummberLottery from "../../src/components/WinNumberLottery";
import SummaryLottery from "../../src/components/SummaryLottery";
import TypeLottery from "../../src/components/TypeLottery";
import TotalLottery from "../../src/components/TotalLottery";
import History from "../../src/components/History";
import Comment from "../../src/components/Comment";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function LotteryPage() {
  const [key, setKey] = useState('two-lottery');
  const [showList, setShowList] = useState([]);
  const [summaryList, setSummaryList] = useState([]);
  const [lotteryType, setLotteryType] = useState("hanoi-privilege");
  const [total, setTotal] = useState(false);
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState(0.00);
  const [totalPrice, setTotalPrice] = useState(0.00);

  const handleTabSelect = (k) => {
    setKey(k);
  };

  const calculatePrice = (price, length) => {
    const sum = parseFloat(price) * parseFloat(length);
    const newTotalPrice = totalPrice + sum;
    setTotalPrice(newTotalPrice);
    setPrice(newTotalPrice);
  };

  const minusPrice = (data) => {
    const newPrice = price - parseFloat(data);
    const newTotalPrice = totalPrice - parseFloat(data);
    setPrice(newPrice);
    setTotalPrice(newTotalPrice);
  };

  const addToSummaryList = () => {
    setSummaryList([]);
    showList.forEach((showListData) => {
      showListData.number.forEach((numberData) => {
        console.log(showListData.id);
        if (showListData.id === "1") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.bottom !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวล่าง",
              data: numberData,
              amount: showListData.bottom,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "2") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "3 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.toot !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "3 ตัวโต๊ด",
              data: numberData,
              amount: showListData.toot,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "3") {
          console.log("เข้า");
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "3 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "4") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.bottom !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวล่าง",
              data: numberData,
              amount: showListData.bottom,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "5") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "วิ่งบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.bottom !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "วิ่งล่าง",
              data: numberData,
              amount: showListData.bottom,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "6") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.bottom !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "2 ตัวล่าง",
              data: numberData,
              amount: showListData.bottom,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        } else if (showListData.id === "7") {
          if (showListData.top !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "3 ตัวบน",
              data: numberData,
              amount: showListData.top,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
          if (showListData.toot !== 0) {
            const updatedList = {
              id: showListData.id,
              type: "3 ตัวโต๊ด",
              data: numberData,
              amount: showListData.toot,
            };
            setSummaryList((prevState) => [...prevState, updatedList]);
          }
        }

      });
    });
  };


  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Header />
      </header>
      <body>
        {total === true ? (
          <Container fluid style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
            <TotalLottery
              summaryList={summaryList}
              setSummaryList={setSummaryList}
              lotteryType={lotteryType}
              setLotteryType={setLotteryType}
              setTotal={setTotal}
              setShowList={setShowList}
              comment={comment}
              setComment={setComment}
            />
          </Container>
        ) : (
          <Row style={{ paddingTop: 100, paddingLeft: 16, }}>
            <Col sm={6}>
              <Container fluid style={{ borderRadius: '10px', paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: lotteryType === "hanoi-normal" ? "#E8988B" : lotteryType === "hanoi-privilege" ? "#D3E0EA" : lotteryType === "hanoi-vip" ? "#A1CAE2" : lotteryType === "lao-normal" ? "#E4A0F7" : "#FBEDBE" }}>
                <TypeLottery setSummaryList={setSummaryList} setLotteryType={setLotteryType} lotteryType={lotteryType} />
              </Container>
              <br />
              <Container fluid style={{ borderRadius: '10px', paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: lotteryType === "hanoi-normal" ? "#E8988B" : lotteryType === "hanoi-privilege" ? "#D3E0EA" : lotteryType === "hanoi-vip" ? "#A1CAE2" : lotteryType === "lao-normal" ? "#E4A0F7" : "#FBEDBE" }}>
                <Container>
                  <Col>
                    <Row className="d-flex justify-content-between align-items-center">
                      <div className="mb-3">
                        <Button
                          variant={key === 'two-lottery' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('two-lottery')}
                          style={{ marginRight: '16px' }}
                        >
                          2 ตัว
                        </Button>
                        <Button
                          variant={key === 'three-lottery' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('three-lottery')}
                          style={{ marginRight: '16px' }}
                        >
                          3 ตัว
                        </Button>
                        <Button
                          variant={key === 'six-back' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('six-back')}
                          style={{ marginRight: '16px' }}
                        >
                          6 กลับ
                        </Button>
                        <Button
                          variant={key === 'nineteen-door' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('nineteen-door')}
                          style={{ marginRight: '16px' }}
                        >
                          19 ประตู
                        </Button>
                        <Button
                          variant={key === 'number-run' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('number-run')}
                          style={{ marginRight: '16px' }}
                        >
                          เลขวิ่ง
                        </Button>
                        {/* <Button
                          variant={key === 'win-number' ? 'danger' : 'light'}
                          onClick={() => handleTabSelect('win-number')}
                          style={{ marginRight: '16px' }}
                        >
                          วินเลข
                        </Button> */}
                      </div>
                    </Row>
                    <br />
                    <Container fluid style={{ paddingTop: 16, paddingBottom: 16 }}>
                      <div className="">
                        {key === 'two-lottery' && <TwoLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />}
                        {key === 'three-lottery' && <ThreeLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />}
                        {key === 'six-back' && <SixBackLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />}
                        {key === 'nineteen-door' && <NineteenDoorLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />}
                        {key === 'number-run' && <NumberRunLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />}
                        {/* {key === 'win-number' && <WinNummberLottery setSummaryList={setSummaryList} showList={showList} setShowList={setShowList} calculatePrice={calculatePrice} />} */}
                      </div>
                    </Container>
                    <br />
                    <Container>
                      <SummaryLottery summaryList={summaryList} setSummaryList={setSummaryList} lotteryType={lotteryType} setTotal={setTotal} showList={showList} setShowList={setShowList} addToSummaryList={addToSummaryList} minusPrice={minusPrice} />
                    </Container>
                    <br />
                  </Col>
                </Container>
              </Container>
              <Container fluid style={{ paddingTop: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: 16, backgroundColor: "#FFFFFF" }}>
                <Comment comment={comment} setComment={setComment} lotteryType={lotteryType} price={price} setPrice={setPrice} />
              </Container>
            </Col>
            <Col sm={6}>
              <Container fluid style={{ paddingTop: 90, paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}>
                <Container>
                  <History />
                </Container>
              </Container>
            </Col>
          </Row>
        )}
      </body >
      {/* <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 0 }}>
        <Footer />
      </footer> */}
    </>
  );
}

export default LotteryPage;
