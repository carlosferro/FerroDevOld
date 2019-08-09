import React, {useEffect, useState} from 'react'
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

function LoginFailed() {
    return (
        <Row className="text-center justify-content-around">
            <Col xs={"auto"}>
                <Card style={{width: '20rem'}}>
                    <Card.Body>
                        <Card.Text>
                            Failed to login.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}


LoginFailed.propTypes = {};

export default LoginFailed;