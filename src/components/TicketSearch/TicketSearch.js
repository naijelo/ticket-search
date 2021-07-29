import React, {useState, useEffect} from "react";

import {MainTicketSearchWrapper, InputSubWrapper, DatePickerActivateField, CalendarWrapper} from "./TicketSearch.style.js";
import { StyledButton } from "../Button/Button.style.js";
import { StyledInput } from "../Input/Input.style.js";
import { StyledPagination } from "../Pagination/Pagination.style.js";
import { StyledDropDown } from "../DropDown/DropDown.style.js";
import { StyledCards } from "../Cards/Cards.style.js";
import { DatePicker } from "../Calendar/Calendar.style.js";

import * as axios from "axios";
import jsondata from '../Input/cities.json';


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

    //visibility of calendar
    let changeVisibility = () => setDateVisibility(!dateVisibility);

    return (
        <div>
            <MainTicketSearchWrapper
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
                    <DatePickerActivateField onClick={changeVisibility}>
                        {fullDate ? `${fullDate}` : "Дата"}
                    </DatePickerActivateField>
                    {dateVisibility === true && 
                    <DatePicker
                              setFullDate={setFullDate}
                              setDateVisibility={setDateVisibility}
                    />}
                </CalendarWrapper>

                    <StyledButton title="Submit" 
                        children={"Поиск"}
                    />
            </MainTicketSearchWrapper>

            <StyledCards ticketData={currentCards} 
                    loading={loading}
                    dataError={dataError}/>
            <StyledPagination postsPerPage={postsPerPage} totalPosts={ticketData.length} paginate={paginate}/>

        </div>
    )
}

export default TicketSearch;