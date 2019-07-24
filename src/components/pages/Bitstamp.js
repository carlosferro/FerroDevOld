import React, {useEffect, useState} from 'react'
import OrderBook from '../OrderBook'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const bitstampContracts = ["btcusd", "btceur", "eurusd", "xrpusd", "xrpeur", "xrpbtc", "ltcusd",
    "ltceur", "ltcbtc", "ethusd", "etheur", "ethbtc", "bchusd", "bcheur", "bchbtc"];

function Bitstamp() {
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);
    const [activeContracts, setActiveContracts] = useState(["btcusd"]);
    const [ws, setWs] = useState();

    useEffect(
        () => {
            initWs();
        },
        [],
    );
    useEffect(
        () => {
            setWs(ws => {
            ws.onmessage = function (evt) {
                    let response = JSON.parse(evt.data);
                    switch (response.event) {
                        case 'data': {
                            let data = response.data;
                            let contract = response.channel.substring(11);
                            console.log(activeContracts);
                            setBids(data.bids.slice(0, 10));
                            setAsks(data.bids.slice(0, 10));
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
            return ws;
            })
        },
        [activeContracts],
    );

    let onMessage =

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
                    console.log(activeContracts);
                    setBids(data.bids.slice(0, 10));
                    setAsks(data.bids.slice(0, 10));
                    // if (contract => activeContracts.includes(contract)) {
                    //     setBids(bids => {
                    //         bids[contract] = data.bids.slice(0, 10);
                    //         return bids;
                    //     });
                    //     setAsks(asks => {
                    //         asks[contract] = data.asks.slice(0, 10);
                    //         return asks;
                    //     });
                    // }
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
        console.log("val:" + val)
    };

    return (
        <Row className="mt-3">
            <Col xs="auto">
                <ToggleButtonGroup vertical type="checkbox" value={activeContracts}
                                   onChange={handleContractChange}>
                    {bitstampContracts.map(
                        (bitstampContract) =>
                            <ToggleButton
                                onChange={() => activeContracts.includes(bitstampContract) ?
                                    ws.send(getUnsubscribeString(bitstampContract)) :
                                    ws.send(getSubscribeString(bitstampContract))
                                }
                                value={bitstampContract}>{bitstampContract}</ToggleButton>
                    )}
                </ToggleButtonGroup>
            </Col>
            <Col>
                <OrderBook asks={asks}
                           bids={bids}/>
                {/*<OrderBook asks={asks["btcusd"] ? asks["btcusd"] : []}*/}
                           {/*bids={bids["btcusd"] ? bids["btcusd"] : []}/>*/}
                {/*{activeContracts.map(*/}
                    {/*(contract) => <OrderBook asks={asks[contract] ? asks[contract] : []}*/}
                                             {/*bids={bids[contract] ? bids[contract] : []}/>*/}
                {/*)}*/}
            </Col>
        </Row>
    );
}

export default Bitstamp;