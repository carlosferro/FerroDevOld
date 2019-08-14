import React, {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserContext from '../context/UserContext'
import {Redirect} from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";

// TODO: Validate input inputs
function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [registering, setRegistering] = useState(false);
    const [show, setShow] = useState(false);
    const [state, setState] = useContext(UserContext);

    function handleUsernameChange(e) {
        setUsername(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault();

        setRegistering(true);

        //http://localhost:8080/
        //https://ferroexchange.herokuapp.com/auth/register
        fetch('https://ferroexchange.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        }).then(response => {
                setRegistering(false);
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error();
                }
            }
        ).then((data) => {
                setState(state => setState({...state, logged: true, token: data.token}));
            }, error => {
                setShow(true);
            }
        )
    }

    if (state.logged) {
        return <Redirect to='/'/>;
    }
    return (
        <Row className="justify-content-around">
            <Col xs={"auto"}>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text"
                                      placeholder="Username"
                                      value={username}
                                      onChange={handleUsernameChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required
                                      type="password"
                                      placeholder="Password"
                                      value={password}
                                      onChange={handlePasswordChange}/>
                    </Form.Group>
                    {
                        registering ? (
                            <Button variant="dark" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                Registering
                            </Button>
                        ) : (
                            <Button onClick={handleClick} variant="dark"
                                    type="submit">
                                Register
                            </Button>
                        )
                    }
                </Form>
                <Toast className="mt-2" onClose={() => setShow(false)} show={show} delay={3000}
                       autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                        />
                        <strong className="mr-auto">Register Failed</strong>
                    </Toast.Header>
                    <Toast.Body>Something wrong happened!</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

Register.propTypes = {};

export default Register;

// References:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
