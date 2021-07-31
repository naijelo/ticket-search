import React from "react";
import {StartPreloader} from "../Preloader/Preloader.style.js";

const Cards = ({ticketData, loading, dataError, ...rest}) => {
    if (loading) {
        return <h2><StartPreloader/></h2>
    }
    if (dataError) {
        return <h3>К сожалению, мы ничего не нашли по запросу. Давайте попробуем ещё раз?:)</h3>
    }
    return (
        <ul {...rest}>{ticketData.map((item, index) => (
                <li key={index}>
                    <div>Дата вылета: {item.depart_date}</div>
                    <div>Цена в рублях: {item.value}</div>
                </li>
    ))}
        </ul>
    )
}

export default Cards;