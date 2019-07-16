import React from 'react'
import PriceRow from './PriceRow'
import Table from 'react-bootstrap/Table'

function PriceTable(props) {

    return (
        <div>
            <Table size="sm" striped>
            <thead>
                    <tr>
                        <th colSpan="2">{props.side === "bid" ? "Bids" : "Asks"}</th>
                    </tr>
                    {props.side === "bid" ?
                        <tr><th>Volume</th><th>Price</th></tr> :
                        <tr><th>Price</th><th>Volume</th></tr>
                    }
                </thead>
                <tbody>
                    {props.priceLevels.map((priceLevel) =>
                        <PriceRow priceLevel={props.side === "bid" ? priceLevel.slice(0, 2).reverse() :
                        priceLevel.slice(0, 2)} />
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default PriceTable