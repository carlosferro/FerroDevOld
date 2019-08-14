import React, {useEffect, useState} from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OrderForm from "../OrderForm";
import OrderBook from "../OrderBook";

function MyExchange() {
    const [orderBook, setOrderBook] = useState({bids: [], asks: []});

    useEffect(
        () => {
            let getOrderBookInterval = setInterval(getOrderBook, 1000);
            return function cleanup() {
                clearInterval(getOrderBookInterval);
            };
        },

        [],
    );

    function getOrderBook() {

        //http://localhost:8080/order/orderbook
        // https://ferroexchange.herokuapp.com/order/orderbook
        fetch('https://ferroexchange.herokuapp.com/order/orderbook', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => {
                return response.json()
            }
        ).then((data) => {
                setOrderBook(() => {
                    let bids = [];
                    let asks = [];
                    for (let i = 0; i < data.bids.length; i++) {
                        bids.push([data.bids[i].price, data.bids[i].volume])
                    }
                    for (let i = 0; i < data.asks.length; i++) {
                        asks.push([data.asks[i].price, data.asks[i].volume])
                    }
                    return {bids: bids, asks: asks};
                });
            }
        )
    }

    return (
        <div>
            <Row>
                <Col className="ml-1" xs="auto">
                    <OrderForm/>
                </Col>
                <Col>
                    <Row className="justify-content-around">
                        <Col className="text-center border ml-1" xs="auto">
                            <h1>FROUSD</h1>
                            <OrderBook bids={orderBook.bids} asks={orderBook.asks}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

MyExchange.propTypes = {};

export default MyExchange;