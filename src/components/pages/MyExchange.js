import React, {useContext, useEffect, useState} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from '../../context/UserContext'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function MyExchange() {
    const [state, setState] = useContext(UserContext);

    return (
        <div>
            <Row>
                <Col className="border ml-1" xs="auto">
                    <Form className="my-2">
                        <Form.Group controlId="formOrderType">
                            <Form.Control size="sm" as="select">
                                <option>Limit</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control size="sm" type="number"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control size="sm" type="number"></Form.Control>
                        </Form.Group>
                        <Form.Row className="text-center">
                            <Col>
                                <Button variant="success" size="sm" type="submit">
                                    Buy
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="danger" size="sm" type="submit">
                                    Sell
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

MyExchange.propTypes = {};

export default MyExchange;