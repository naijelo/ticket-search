import React from "react";
import StyledButton from "./Button.style.js";

export default {
    title: "StyledButton",
    component: StyledButton
}

const Template = (args) => <StyledButton {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    color: "#ffa928",
    children: "Primary"
}

export const Secondary = Template.bind({});
Secondary.args = {
    color: "grey",
    children: "Secondary"
}



// export const Primary = () => <Button variant="primary">Primary</Button>
// export const Secondary = () => <Button variant="secondary">Secondary</Button>
