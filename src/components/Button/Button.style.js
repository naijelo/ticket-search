import styled from "styled-components";
import Button from "./Button";

export const StyledButton = styled(Button) `
    border: none;
    height: 10vh;
    width: 15vw;
    line-height: 2vh;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    color: white;
    font-weight: 600;
    background-color: ${props => props.inputColor || "#ffa928"};
    &:hover {
        background-color: black;
    }
`