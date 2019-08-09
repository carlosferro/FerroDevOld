import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Contact() {
    return (
        <Row className="text-center justify-content-around">
            <Col xs={"auto"}>
                <Card style={{width: '20rem'}}>
                    <Card.Body>
                        <Card.Text>
                            Feel free to send me sugestions, questions or just get to know me.
                            <a  href="mailto:ferro@ferrodev.com">
                                <Button className="mt-3" variant="dark">Mail To</Button>
                            </a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Contact;
