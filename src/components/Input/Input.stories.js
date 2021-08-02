import React from "react";
import {StyledInput} from "./Input.style.js";

export default {
    title: "Input",
    component: StyledInput
}

const Template = (args) => <StyledInput {...args}/>

export const Standart = Template.bind({});
Standart.args = {
        children: "Standart",
        inputHeight: "38px"
    }

export const Large = Template.bind({});
Large.args = {
        children: "Large",
        inputHeight: "76px"
    }