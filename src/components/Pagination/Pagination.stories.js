import React from "react";
import {StyledPagination} from "./Pagination.style.js";

export default {
    title: "Pagination",
    component: StyledPagination
}

const Template = (args) => <StyledPagination {...args} />

export const LightPagination = Template.bind({});
LightPagination.args = {
    pagiColor: "black",
    pagiBGColor: "white",
    postsPerPage: 10,
    totalPosts: 100
}

export const DarkPagination = Template.bind({});
DarkPagination.args = {
    pagiColor: "white",
    pagiBGColor: "black",
    postsPerPage: 10,
    totalPosts: 100
}
