import React, {useContext} from 'react'
import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom'
import UserContext from './context/UserContext'


function NavAuth() {
    const [state, setState] = useContext(UserContext);

    function handleClick() {
        setState(state => setState({...state, logged: false, token: null}));
    }

    return (
        <Nav>
            {state.logged ? (
                <Nav.Link as={Link} to="/" onClick={handleClick}>Logout</Nav.Link>) : (
                <>
                    <Nav.Link as={Link} to="/login"> Login </Nav.Link>
                </>
            )}
        </Nav>
    );
}

NavAuth.propTypes = {};

export default NavAuth;