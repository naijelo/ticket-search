import styled from "styled-components";
import Button from "./Button";

export const StyledButton = styled(Button) `
    border: none;
    height: 40px;
    width: 20%;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-weight: 600;
    margin-left: 5px;
    background-color: ${props => props.inputColor || "#ffa928"};
    &:hover {
        background-color: black;
    }
`