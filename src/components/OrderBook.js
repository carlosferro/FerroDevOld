import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PriceTable from './PriceTable'

function OrderBook(props) {
    return (
        <Row className="justify-content-center text-center">
            <Col xs="auto">
                <PriceTable side="bid" priceLevels={props.bids} />
            </Col>
            <Col xs="auto">
                <PriceTable side="ask" priceLevels={props.asks} />
            </Col>
        </Row>
    )
}

export default OrderBook;