import React, {useEffect, useState} from 'react'
import OrderBook from '../OrderBook'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const bitstampContracts = ["bchbtc", "bcheur", "ltcusd", "bchusd", "btceur", "btcusd", "ethbtc", "etheur",
    "ethusd", "eurusd", "ltcbtc", "ltceur", "xrpusd", "xrpeur", "xrpbtc",].sort();

function Bitstamp() {
    const [priceLevels, setPriceLevels] = useState({});
    const [activeContracts, setActiveContracts] = useState(["btcusd"]);
    const [ws, setWs] = useState();

    useEffect(
        () => {
            initWs();
        },
        [],
    );

    function initWs() {
        let newWs = new WebSocket("wss://ws.bitstamp.net");

        newWs.onopen = function () {
            activeContracts.map(contract => newWs.send(getSubscribeString(contract)));
        };

        newWs.onmessage = function (evt) {
            let response = JSON.parse(evt.data);
            switch (response.event) {
                case 'data': {
                    let data = response.data;
                    let contract = response.channel.substring(11);

                    setPriceLevels(priceLevels => {
                        priceLevels[contract] = [data.bids.slice(0, 10), data.asks.slice(0, 10)];
                        return JSON.parse(JSON.stringify(priceLevels));
                        ;
                    });
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

        newWs.onclose = function () {
            console.log('Websocket connection closed');
        };

        newWs.onclose = function () {
            console.log('Websocket connection closed');
            initWs();
        };

        setWs(newWs);
    }

    function getSubscribeString(pContract) {
        return JSON.stringify({
            "event": "bts:subscribe",
            "data": {
                "channel": "order_book_" + pContract
            }
        })
    }

    function getUnsubscribeString(pContract) {
        return JSON.stringify({
            "event": "bts:unsubscribe",
            "data": {
                "channel": "order_book_" + pContract
            }
        })
    }

    const handleContractChange = val => {
        setActiveContracts(val);
    };

    return (
        <Row className="mt-3">
            <Col xs="auto">
                <ToggleButtonGroup vertical type="checkbox" value={activeContracts}
                                   onChange={handleContractChange}>
                    {bitstampContracts.map(
                        (bitstampContract) =>
                            <ToggleButton
                                variant="outline-dark"
                                onChange={() => activeContracts.includes(bitstampContract) ?
                                    ws.send(getUnsubscribeString(bitstampContract)) :
                                    ws.send(getSubscribeString(bitstampContract))
                                }
                                value={bitstampContract}>{bitstampContract.toUpperCase()}
                            </ToggleButton>
                    )}
                </ToggleButtonGroup>
            </Col>
            <Col>
                <Row className="justify-content-center text-center">
                    {activeContracts.map(contract => <Col xs="auto" className="border">
                            <h1>{contract.toUpperCase()}</h1>
                            <OrderBook
                                asks={priceLevels[contract] ? priceLevels[contract][1] : []}
                                bids={priceLevels[contract] ? priceLevels[contract][0] : []}/>
                        </Col>
                    )}
                </Row>
            </Col>

        </Row>
    );
}

export default Bitstamp;