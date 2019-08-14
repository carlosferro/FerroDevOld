import React, {useContext, useState} from 'react'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import UserContext from './context/UserContext'
import Toast from "react-bootstrap/Toast";

function OrderForm(props) {
    const [state, setState] = useContext(UserContext);

    const [price, setPrice] = useState();
    const [volume, setVolume] = useState();
    const [show, setShow] = useState(false);

    function handlePriceChange(e) {
        setPrice(e.target.value)
    }

    function handleVolumeChange(e) {
        setVolume(e.target.value)
    }

    function handleBuy(e) {
        e.preventDefault();

        //http://localhost:8080/
        // https://ferroexchange.herokuapp.com/order/create
        fetch('https://ferroexchange.herokuapp.com/order/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
            body: JSON.stringify({price: price, volume: volume, side: "bid"})
        }).then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error();
                }
            }
        ).then(null, error => {
                setShow(true);
            }
        )
    }

    function handleSell(e) {
        e.preventDefault();

        //http://localhost:8080/
        fetch('https://ferroexchange.herokuapp.com/order/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
            body: JSON.stringify({price: price, volume: volume, side: "ask"})
        }).then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error();
                }
            }
        ).then(null, error => {
                setShow(true);
            }
        )
    }

    return (
        <div>
            <Form className="border">
                <Form.Label>Order Form</Form.Label>
                <Form.Group controlId="formOrderType">
                    <Form.Control size="sm" as="select">
                        <option>Limit</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control size="sm"
                                  required
                                  type="text"
                                  placeholder="Price"
                                  value={price}
                                  onChange={handlePriceChange}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control size="sm"
                                  required
                                  type="text"
                                  placeholder="Amount"
                                  value={volume}
                                  onChange={handleVolumeChange}>

                    </Form.Control>
                </Form.Group>
                <Form.Row className="text-center">
                    <Col>
                        <Button onClick={handleBuy} variant="success" size="sm" type="submit">
                            Buy
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={handleSell} variant="danger" size="sm" type="submit">
                            Sell
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
            <Toast className="mt-2" onClose={() => setShow(false)} show={show} delay={3000}
                   autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    <strong className="mr-auto">Login required</strong>
                </Toast.Header>
                <Toast.Body>Login to create orders</Toast.Body>
            </Toast>
        </div>
    );
}


OrderForm.propTypes = {};

export default OrderForm;