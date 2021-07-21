import React, {useState, useEffect} from "react";
import "./TicketSearch.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Pagination from "../Pagination/Pagination";
import DropDown from "../DropDown/DropDown";
import DatePicker from "react-datepicker";
import Cards from "../Cards/Cards";
import * as axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

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
    const [inputDate, setInputDate] = useState("");
    const [fullDate, setFullDate] = useState("");
    
    //filter state and arrow of data from server
    const [filteredDataFrom, setFilteredDataFrom] = useState([]);
    const [filteredDataTo, setFilteredDataTo] = useState([]);
    const [cities, setCities] = useState([]);
    
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    //paginator support data
    const indexOfLastCard = currentPage * postsPerPage;
    const indexOfFirstCard = indexOfLastCard - postsPerPage;
    const currentCards = ticketData.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get("/cities.json");
            setCities(response.data);
            setLoading(false);
        }
        fetchData();
    }, []);
    
    const handleFilter = (event, setFilteredData, setWordEntered) => {
        
        if (event.target.value === "") {
            setFilteredData([]);
        } else {
            setFilteredData(cities.filter((value) => {
                return value.name.toLowerCase().includes(event.target.value.toLowerCase());
            }));
        }
        setWordEntered(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            "from": cities.find((item) => inputFrom === item.name).code,
            "to": cities.find((item) => inputTo === item.name).code,
            "date": fullDate,
        }

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

    const addCity = (event, addCityToState, setFilteredData) => {
        const target = event.target;
        if (target.tagName.toLowerCase() === "li") {
            setFilteredData([]);
            addCityToState(target.textContent);
        }
    }

    const handleInput = (date) => {
        // const fullYear = date.getFullYear();
        // const month = date.getMonth() + 1;
        // const day = date.getDate();
        // const fullDateTemp = fullYear+"-"+month+"-"+day;
        const fullDateTemp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        setFullDate(fullDateTemp);
        setInputDate(date);
    }

    return (
        <div>
            <form className="ticketSearch"
                onSubmit={handleSubmit}
                >
                <div className="inputWrapper">
                    <div className="inputWrapper__from">
                    <Input label={"Откуда"} 
                    value={inputFrom}
                    onInput={event => handleFilter(event, setFilteredDataFrom, setInputFrom)} 
                    // onInput={event => setInputFrom(event.target.value)}

                    />
                    
                    {filteredDataFrom.length !== 0 && 
                        <DropDown setCustomInput={setInputFrom} 
                            filteredData={filteredDataFrom} 
                            setFilteredData={setFilteredDataFrom}
                            addCity={addCity}/>}
                        </div>

                    <Input label={"Куда"} 
                    value={inputTo}
                    onChange={event => handleFilter(event, setFilteredDataTo, setInputTo)} 
                    // onInput={event => setInputTo(event.target.value)}
                    />
                    {filteredDataTo.length !== 0 && 
                        <DropDown setCustomInput={setInputTo} 
                            filteredData={filteredDataTo} 
                            setFilteredData={setFilteredDataTo}
                            addCity={addCity}/>}

                </div>

                    <DatePicker 
                        placeholderText="Выберите дату"
                        className="datepicker"
                        selected={inputDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={handleInput}
                        minDate={new Date()}
                        required={true}
                    />

                    <Button title="Submit" 
                        children={"Проверить наличие"}
                    />
            </form>

            <Cards ticketData={currentCards} 
                    loading={loading}
                    dataError={dataError}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={ticketData.length} paginate={paginate}/>

        </div>
    )
}

    

export default TicketSearch;