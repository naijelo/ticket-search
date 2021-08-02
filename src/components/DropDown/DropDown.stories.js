import React from "react";
import {StyledDropDown} from "./DropDown.style.js";

export default {
    title: "DropDown",
    component: StyledDropDown
}

const filteredDataFake = [{name:"Москва"}, {name:"Минск"}, {name:"Владивосток"}, {name:"Кострома"}, {name:"Канберра"}, {name:"Канберра"}];

const Template = (args) => <StyledDropDown {...args}/>

export const WhiteTheme = Template.bind({});
WhiteTheme.args = {
        children: "WhiteTheme",
        dropdownBackColor: "white",
        dropdownColor: "black",
        filteredData:filteredDataFake
    }

export const DarkTheme = Template.bind({});
DarkTheme.args = {
        children: "DarkTheme",
        dropdownBackColor: "black",
        dropdownColor: "white",
        filteredData:filteredDataFake
    }
