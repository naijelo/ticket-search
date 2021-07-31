import styled from "styled-components";
import DropDown from "./DropDown";

export const StyledDropDown = styled(DropDown) `
    position: absolute;
    z-index: 10;
    width: 100%;
    max-height: 300px; 
    max-width: 18%;
    overflow-x: hidden;
    cursor: pointer;
    margin-top: 43px;
    color: #000; 
    color: ${props => props.dropdownColor || "#000"};
    background-color: ${props => props.dropdownBackColor || "#fff"};

    li {
        list-style: none;
        text-align: center;
        margin: 0px;
        padding: 0px;
    }
    @media (max-width: 575px) {
        width: 100%;
        max-width: 45%;
    }
`