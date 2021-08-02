import React from "react";
import {StyledButton} from "./Button.style.js";

export default {
    title: "Button",
    component: StyledButton
}

const Template = (args) => <StyledButton {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    inputColor: "#ffa928",
    children: "Primary"
}

export const Secondary = Template.bind({});
Secondary.args = {
    inputColor: "grey",
    children: "Secondary"
}
