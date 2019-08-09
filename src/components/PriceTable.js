import React from 'react'
import PriceRow from './PriceRow'
import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types';

function PriceTable(props) {

    return (
        <div>
            <Table size="sm" striped>
                <thead>
                <tr>
                    <th colSpan="2">{props.side === "bid" ? "Bids" : "Asks"}</th>
                </tr>
                {props.side === "bid" ?
                    <tr>
                        <th>Volume</th>
                        <th>Price</th>
                    </tr> :
                    <tr>
                        <th>Price</th>
                        <th>Volume</th>
                    </tr>
                }
                </thead>
                <tbody>
                {props.priceLevels.map((priceLevel) =>
                    <PriceRow id={priceLevel[0].toString()} priceLevel={props.side === "bid" ?
                        priceLevel.slice().reverse() : priceLevel}/>
                )}
                </tbody>
            </Table>
        </div>
    )
}

PriceTable.propTypes = {
    side: PropTypes.string,
    priceLevels: PropTypes.array,
};

export default PriceTable