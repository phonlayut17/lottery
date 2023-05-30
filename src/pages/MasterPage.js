import 'bootstrap/dist/css/bootstrap.min.css';
//สร้าง Component Master Page
const MasterPage = (props) => {


    // return (<>
    //     {/*-------สร้าง แถบเมนูด้านบน ด้วย Navbar จาก ReactBootstrap-----------*/}
    //     <Navbar bg="light" expand="lg">
    //         <Container>
    //             <Navbar.Brand href="#home">Lottery Slot</Navbar.Brand>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         </Container>
    //     </Navbar>

    //     <div className="container">
    //         {/*--------ส่วนของเนื้อหาเว็บที่จะมาแสดง-----*/}
    //         {props.children}
    //     </div>


    // </>)
    return (<>
        {/*-------สร้าง แถบเมนูด้านบน ด้วย Navbar จาก ReactBootstrap-----------*/}
        {/* <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Lottery Slot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar> */}

        <div className="container">
            {/*--------ส่วนของเนื้อหาเว็บที่จะมาแสดง-----*/}
            {props.children}
        </div>


    </>)

}

export default MasterPage;