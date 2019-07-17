import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import OrderBook from './components/OrderBook'
import About from './components/About'
import { Route, Switch, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Navbar className="font-weight-bold" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">FerroDev</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" >Home</Nav.Link>
              <NavDropdown title="Portfolio" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/bitstamp">Bitstamp</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/about" >About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" />
          <Route path="/about" component={About} />
          <Route path="/bitstamp" component={OrderBook} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;