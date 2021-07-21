import React from "react";
import "./DropDown.css";

const DropDown = ({ theme= "dropdown__lighttheme",filteredData, addCity, setCustomInput, setFilteredData }) => {
    return (
    <ul className={`dropdown ${theme}`}>
        {filteredData.map((value, key) => {
            return (
                <li className="from" key={key} onClick={event => addCity(event, setCustomInput, setFilteredData)}>
                {value.name}
                </li>
            );
        })}
        </ul>
    )
}

export default DropDown;