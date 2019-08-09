import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavAuth from './components/NavAuth'
import Bitstamp from './components/pages/Bitstamp'
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import {Route, Switch, Link, BrowserRouter} from 'react-router-dom'
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import {UserProvider} from "./context/UserContext";
import MyExchange from "./components/pages/MyExchange";
import LoginFailed from "./components/pages/LoginFailed";

function App() {
    return (
        <UserProvider>
            <Container fluid>
                <BrowserRouter>
                    <Navbar sticky="top" className="font-weight-bold mb-3" bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand as={Link} to="/">FerroDev</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <NavDropdown title="Portfolio" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link}
                                                      to="/bitstamp">Bitstamp</NavDropdown.Item>
                                    <NavDropdown.Item as={Link}
                                                      to="/myexchange">My
                                        Exchange</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            </Nav>
                            <NavAuth logged={true}/>
                        </Navbar.Collapse>
                    </Navbar>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/contact" component={Contact}/>
                        <Route path="/bitstamp" component={Bitstamp}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/myexchange" component={MyExchange}/>
                        <Route path="/loginfailed" component={LoginFailed}/>
                    </Switch>
                </BrowserRouter>
            </Container>
        </UserProvider>
    );
}

export default App;