import React from "react";
import DropDown from "./DropDown";

export default {
    title: "DropDown",
    component: DropDown
}

export const WhiteTheme = () => <DropDown theme="dropdown__lighttheme"/>
export const BlackTheme = () => <DropDown theme="dropdown__darktheme"/>