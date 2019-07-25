import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function About() {
    return (
        <Row className="text-center row justify-content-around">
            <Col xs={"auto"}>
                <Card className="mt-4" style={{width: '20rem'}}>
                    <Card.Body>
                        <Card.Text>
                            <p>Feel free to send me sugestions, questions or just get to know me.
                            </p>
                            <a href="mailto:ferro@ferrodev.com"><Button variant="dark">Mail To
                            </Button></a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default About;
