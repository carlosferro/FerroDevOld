import React from 'react'

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

export default PriceRow
