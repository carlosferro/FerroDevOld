import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import FerroDev from '../../images/FerroDev.png'
import Orderbook from '../../images/OrderBook.png'
import JumbotronBackGround from '../../images/JumbotronBG.png'
import MyExchange from '../../images/MyExchange.png'
import {Link} from 'react-router-dom'

const jumbotronStyle = {
    backgroundImage: 'url(' + JumbotronBackGround + ')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
};

function Home() {
    return (
        <div>
            <Row className='justify-content-center'>
                <Col xs={12} sm={12} md={8} xl={6}>
                    <Jumbotron style={jumbotronStyle} className="text-center">
                        <h1 className='font-weight-bolder text-light'>Welcome!</h1>
                        <h4 className='font-weight-bolder text-light mb-5'>
                            This is a simple website made to share some ideas and some code.
                            You are welcome to contact me for any sugestion.
                        </h4>
                    </Jumbotron>
                </Col>
            </Row>
            <Row className="text-center justify-content-around">
                <Col xs={"auto"}>
                    <Card className="mb-3" style={{width: '20rem'}}>
                        <Card.Img variant="top" src={FerroDev}/>
                        <Card.Body>
                            <Card.Title>This Page!</Card.Title>
                            <Card.Text>
                                This page was developed using React and is available at github.
                            </Card.Text>
                            <a rel="noopener noreferrer" target="_blank"
                               href="https://github.com/carlosferro/FerroDev">
                                <Button variant="dark">GitHub</Button>
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={"auto"}>
                    <Card className="mb-3" style={{width: '20rem'}}>
                        <Card.Img variant="top" src={MyExchange}/>
                        <Card.Body>
                            <Card.Title>A exchange sample</Card.Title>
                            <Card.Text>
                                A sample exchange I created using spring, accessed through REST.
                            </Card.Text>
                            <Link to="/myexchange"><Button variant="dark">Go To!</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={"auto"}>
                    <Card className="mb-3" style={{width: '20rem'}}>
                        <Card.Img variant="top" src={Orderbook}/>
                        <Card.Body>
                            <Card.Title>Bitstamp</Card.Title>
                            <Card.Text>
                                A implementation to access Bitstamp through its api.
                            </Card.Text>
                            <Link to="/bitstamp"><Button variant="dark">Go To!</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home
