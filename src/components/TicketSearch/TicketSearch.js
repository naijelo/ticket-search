import React, {useState, useEffect} from "react";

import { StyledButton } from "../Button/Button.style.js";
import { StyledInput } from "../Input/Input.style.js";
import { StyledPagination } from "../Pagination/Pagination.style.js";
import { StyledDropDown } from "../DropDown/DropDown.style.js";
import { StyledCards } from "../Cards/Cards.style.js";
import { DatePicker } from "../Calendar/Calendar.style.js";

import * as axios from "axios";
import jsondata from '../Input/cities.json';

import styled from "styled-components";

const TicketWrapper = styled.form `
    margin-top: 30vh;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 575px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`

const InputSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2px;
    width: 20vw;
    height: 40px;
    margin-right: 10px;
    @media (max-width: 575px) {
       margin-bottom: 10px;
    }
`

const DatePickerWrapper = styled.div `
    position: relative;
    background-color: #fff;
    cursor: pointer;
    width: 20vw;
    height: 40px;
    border-radius: 4px;
    margin-right: 1px;
    text-align: center;
    line-height: 35px;
`
const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
`


const TicketSearch = (props) => {

    
    // const proxy = "https://cors-anywhere.herokuapp.com/";
    // const token = "e44551a4aa602315a353a5fc2d7bed15";
    // const api = "http://api.travelpayouts.com/data/ru/cities.json";

    //errors
    const [dataError, setDataError] = useState(false);
    //set data into inputs
    const [inputFrom, setInputFrom] = useState("");
    const [inputTo, setInputTo] = useState("");
    
    //get date from inputs
    // const [inputDate, setInputDate] = useState("");
    const [fullDate, setFullDate] = useState("");
    
    //filter state and arrow of data from server
    const [filteredDataFrom, setFilteredDataFrom] = useState([]);
    const [filteredDataTo, setFilteredDataTo] = useState([]);
    const [cities, setCities] = useState([]);
    
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    //activate drop down menu from button
    const [dateVisibility, setDateVisibility] = useState(false);
    
    //paginator support data
    const indexOfLastCard = currentPage * postsPerPage;
    const indexOfFirstCard = indexOfLastCard - postsPerPage;
    const currentCards = ticketData.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    //fetch cities from aviasales api using useEffect cause of sideeffect
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get("/cities.json");
            setCities(response.data);
            if (!response) {
                setCities(jsondata);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    
    //implement filter to find matches in response and input
    const handleFilter = (event, setFilteredData, setWordEntered) => {
        
        if (event.target.value === "") {
            setFilteredData([]);
        } else {
            setFilteredData(cities.filter((value) => {
                return value.name.toLowerCase().includes(event.target.value.toLowerCase());
            }));
        }
        setWordEntered(event.target.value.charAt(0).toUpperCase() + event.target.value.substr(1));
    };

    //make object from received data and send it to server
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            "from": cities.find((item) => inputFrom === item.name).code,
            "to": cities.find((item) => inputTo === item.name).code,
            "date": fullDate,
        }
        console.log(formData);
        const requestData =`?origin=${formData.from}&destination=${formData.to}&depart_day=${formData.date}&one_way=true`;

        axios.get("http://min-prices.aviasales.ru/calendar_preload" + requestData)
        .then((response) => {
            response = response.data.best_prices;
        console.log(response);
        setTicketData(response)
        })
        .catch(err => {
            setDataError(true);
        });
    };

    //add city from dropdown list to input
    const addCity = (event, addCityToState, setFilteredData) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === "li") {
            setFilteredData([]);
            addCityToState(target.textContent);
        }
    }

    // get date from date-input
    // const handleInput = (date) => {
    //     const fullDateTemp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    //     setFullDate(fullDateTemp);
    //     setInputDate(date);
    // }

    //visibility of calendar
    let changeVisibility = () => setDateVisibility(!dateVisibility);

    return (
        <div>
            <TicketWrapper
                onSubmit={handleSubmit}
                >
                <InputSubWrapper>
                    <StyledInput 
                        // label={"Откуда"}
                        placeholder="Откуда"
                        autoFocus={true} 
                        value={inputFrom}
                        onInput={event => handleFilter(event, setFilteredDataFrom, setInputFrom)} 
                    />
                    
                    {filteredDataFrom.length !== 0 && 
                        <StyledDropDown setCustomInput={setInputFrom} 
                            filteredData={filteredDataFrom} 
                            setFilteredData={setFilteredDataFrom}
                            addCity={addCity}/>}
                </InputSubWrapper>

                <InputSubWrapper>
                    <StyledInput 
                        // label={"Куда"} 
                        placeholder="Куда"
                        value={inputTo}
                        onInput={event => handleFilter(event, setFilteredDataTo, setInputTo)}
                    />
                    {filteredDataTo.length !== 0 && 
                        <StyledDropDown setCustomInput={setInputTo} 
                            filteredData={filteredDataTo} 
                            setFilteredData={setFilteredDataTo}
                            addCity={addCity}/>}
                </InputSubWrapper>

                <CalendarWrapper>
                    <DatePickerWrapper onClick={changeVisibility}>
                        {fullDate ? `Дата: ${fullDate}` : "Дата"}
                    </DatePickerWrapper>
                    {dateVisibility === true && 
                    <DatePicker
                              setFullDate={setFullDate}
                              setDateVisibility={setDateVisibility}
                    />}
                </CalendarWrapper>

                    <StyledButton title="Submit" 
                        children={"Поиск"}
                    />
            </TicketWrapper>

            <StyledCards ticketData={currentCards} 
                    loading={loading}
                    dataError={dataError}/>
            <StyledPagination postsPerPage={postsPerPage} totalPosts={ticketData.length} paginate={paginate}/>

        </div>
    )
}

export default TicketSearch;