import React, { useState, useEffect } from 'react';
import './App.css';
import PriceTable from './components/PriceTable'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


const subscribeMsg = {
  "event": "bts:subscribe",
  "data": {
    "channel": "order_book_btcusd"
  }
};

function App() {
  // Declare a new state variable, which we'll call "count"
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(
    () => {
      initWs();
    },
    [],
  );

  let ws;
  function initWs(pWs) {
    ws = new WebSocket("wss://ws.bitstamp.net");

    ws.onopen = function () {
      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = function (evt) {
      let response = JSON.parse(evt.data);
      /**
       * This switch statement handles message logic. It processes data in case of data event
       * and it reconnects if the server requires.
       */
      switch (response.event) {
        case 'data': {
          let data = response.data;
          setBids(data.bids.slice(0, 10))
          setAsks(data.asks.slice(0, 10))
          break;
        }
        case 'bts:request_reconnect': {
          initWs();
          break;
        }
        default:
          break;
      }

    };
    ws.onclose = function () {
      console.log('Websocket connection closed');
    };

    ws.onclose = function () {
      console.log('Websocket connection closed');
      initWs();
    };
  }

  return (
    <Container fluid>
      <Navbar className="font-weight-bold" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">FerroDev</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Portfolio" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Bitstamp</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Row className="justify-content-center text-center mt-3">
        <Col sm="auto">
          <PriceTable side="bid" priceLevels={bids} />
        </Col>
        <Col sm="auto">
          <PriceTable side="ask" priceLevels={asks} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;