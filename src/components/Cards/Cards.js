import React from "react";

const Cards = ({ticketData, loading, dataError}) => {
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (dataError) {
        return <h3>К сожалению, мы ничего не нашли по запросу. Давайте попробуем ещё раз?:)</h3>
    }
    return (
        <ul>{ticketData.map((item, index) => (
                <li key={index}>
                    Дата вылета: {item.depart_date}
                    Цена в рублях: {item.value}
                </li>
    ))}
        </ul>
    )
}

export default Cards;