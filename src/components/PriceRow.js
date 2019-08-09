import React from 'react'
import PropTypes from 'prop-types';

function PriceRow(props) {
    return (
        <>
            <tr>
                <td>{props.priceLevel[0]}</td>
                <td>{props.priceLevel[1]}</td>
            </tr>
        </>
    )
}

PriceRow.propTypes = {
    priceLevel: PropTypes.array,
};

export default PriceRow
