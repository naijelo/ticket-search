import styled from "styled-components";
import Cards from "./Cards";

export const StyledCards = styled(Cards) `
    color: blue;
    list-style: none;
    color: black;
    width: 50vw;
    margin: 0 auto;
    margin-top: 50px;
    li {
        border: 1px solid white;
        margin: 5px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
    }
    
`