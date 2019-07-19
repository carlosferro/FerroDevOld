import React, {useEffect, useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PriceTable from './PriceTable'

const subscribeMsg = {
    "event": "bts:subscribe",
    "data": {
      "channel": "order_book_btcusd"
    }
  };

function OrderBook() {
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);

    useEffect(
        () => {
            initWs();
        },
        [],
    );

    let ws;
    function initWs(pWs) {
        ws = new WebSocket("wss://ws.bitstamp.net");

        ws.onopen = function () {
            ws.send(JSON.stringify(subscribeMsg));
        };

        ws.onmessage = function (evt) {
            let response = JSON.parse(evt.data);
            /**
             * This switch statement handles message logic. It processes data in case of data event
             * and it reconnects if the server requires.
             */
            switch (response.event) {
                case 'data': {
                    let data = response.data;
                    setBids(data.bids.slice(0, 10))
                    setAsks(data.asks.slice(0, 10))
                    break;
                }
                case 'bts:request_reconnect': {
                    initWs();
                    break;
                }
                default:
                    break;
            }

        };
        ws.onclose = function () {
            console.log('Websocket connection closed');
        };

        ws.onclose = function () {
            console.log('Websocket connection closed');
            initWs();
        };
    }

    return (
        <Row className="justify-content-center text-center mt-3">
            <Col xs="auto">
                <PriceTable side="bid" priceLevels={bids} />
            </Col>
            <Col xs="auto">
                <PriceTable side="ask" priceLevels={asks} />
            </Col>
        </Row>
    )
}

export default OrderBook;