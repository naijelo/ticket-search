import React from "react";
import DropDown from "./DropDown";

export default {
    title: "DropDown",
    component: DropDown
}

const filteredDataFake = ["Москва", "Минск", "Владивосток", "Кострома", "Канберра"];

export const WhiteTheme = () => <DropDown 
        theme="dropdown__lighttheme"
        // addCity={addCity}
        filteredData={["Москва", "Минск", "Владивосток", "Кострома", "Канберра"]}
        />

export const BlackTheme = () => <DropDown 
        theme="dropdown__darktheme"
        filteredData={["Москва", "Минск", "Владивосток", "Кострома", "Канберра"]}
        />