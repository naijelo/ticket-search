import React, {useState, useRef} from "react";
import styled from "styled-components";

const CalendarHeader = styled.div `
    display: flex;
`
const CalendarMain  = styled.div `
    border: 1px solid blue;
`

const Calendar = ({actualDate}) => {

const [date, setDate] = useState(actualDate);

const yearNames = [2021, 2022, 2023];
const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const weekDayNames = ["Пн", "Вт", "Ср", "Чт" , "Пт", "Сб", "Вс"];
const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const emptyDaysOnStartOfMonth = [6, 0, 1, 2, 3, 4, 5];

let monthSelect = useRef(null);
let yearSelect = useRef(null);

const year = date.getFullYear();
const month = date.getMonth();

//navigation throught months and options for calendar
const moveToPrevMonth = () => {
    const prevDate = new Date(year, month - 1);
    setDate(prevDate);
}

const moveToNextMonth = () => {
    const nextDate = new Date(year, month + 1);
    setDate(nextDate);
}
const changeSelect = () => {
    let monthValue = monthSelect.value;
    let yearValue = yearNames[yearSelect.value];
    const date = new Date(yearValue, monthValue);
    setDate(date);
}
const clickOnDate = (date) => {
    console.log(date);
    setDate(date);
}

// fill calendar with data
const monthDataTemp = [];
const monthDataTemp2 = [];
const tempDateFirstMonth = new Date(year, month);
const tempDateSecondMonth = new Date(year, month + 1);

const fillMonthData = (monthData, tempDate) => {
    const daysInMonth = daysByMonth[tempDate.getMonth()];
    const emptyMonthStart = emptyDaysOnStartOfMonth[tempDate.getDay()];
    let day = 1;

    for (let i = 0; i < (daysInMonth + emptyMonthStart) / 7; i++) {
        monthData[i] = [];
        
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < emptyMonthStart) || day > daysInMonth) {
                monthData[i][j] = undefined;
            } else {
                monthData[i][j] = new Date(year, month, day++);
            }
        }
    }
    return monthData;
}

const firstMonthResult = fillMonthData(monthDataTemp, tempDateFirstMonth);
const secondMonthResult = fillMonthData(monthDataTemp2, tempDateSecondMonth);

    return (
        <>
        <CalendarHeader>
            <button onClick={moveToPrevMonth}>&lt;</button>
            
            <select value={date.getMonth()} 
                    ref={element => monthSelect = element}
                    onChange={changeSelect}>
                    {monthNames.map((name, index) =>
                    <option key={index} value={index}>{name}</option>
                    )}
            </select>
            <select 
                    ref={element => yearSelect = element}
                    onChange={changeSelect}>
                    {yearNames.map((name, index) =>
                    <option key={index} value={index}>{name}</option>
                    )}
            </select>
            <button onClick={moveToNextMonth}>&gt;</button>
        </CalendarHeader>
        <CalendarMain>
            <table>
            <caption>{monthNames[date.getMonth()]}</caption>
                <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>    
                        )}
                    </tr>
                </thead>

                <tbody>
                    {firstMonthResult.map((week, index) =>
                        <tr key={index} 
                            className="week">
                            {week.map((date, index) => date 
                                ? <td key={index}
                                        onClick={() => clickOnDate(date)}>
                                        {date.getDate()}</td>
                                : <td key={index} />
                            )}
                        </tr> 
                    )}
                </tbody>
                </table>
        </CalendarMain>
        <CalendarMain>
            <table>
            <caption>{monthNames[date.getMonth() + 1]}</caption>
                <thead>
                    <tr>
                        {weekDayNames.map(name =>
                            <th key={name}>{name}</th>    
                        )}
                    </tr>
                </thead>

                <tbody>
                    {secondMonthResult.map((week, index) =>
                        <tr key={index} 
                            className="week">
                            {week.map((date, index) => date 
                                ? <td key={index}
                                        onClick={() => clickOnDate(date)}>
                                        {date.getDate()}</td>
                                : <td key={index} />
                            )}
                        </tr> 
                    )}
                </tbody>
                </table>
        </CalendarMain>
        </>
    )
}

export default Calendar;