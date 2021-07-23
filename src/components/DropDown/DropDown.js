import React from "react";
// import "./DropDown.css";

const DropDown = ({ filteredData, addCity, setCustomInput, setFilteredData, ...rest}) => {
    return (
        <ul {...rest}>
        {filteredData.map((value, index) => {
             return(
                    <li className="from" key={index} onClick={event => addCity(event, setCustomInput, setFilteredData)}>
                        {value.name}
                    </li>
             )
            })}
        </ul>
    )
}

export default DropDown;