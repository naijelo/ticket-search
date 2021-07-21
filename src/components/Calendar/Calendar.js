import React from "react";
import "./Calendar.css";

const Calendar = (props) => {
    return (
        <div className="date">
            <label>Отправление
                <input type="date" className="input" required/>
            </label>
        </div>
    )
}

export default Calendar;