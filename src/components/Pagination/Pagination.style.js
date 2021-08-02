import styled from "styled-components";
import Pagination from "./Pagination";

export const StyledPagination = styled(Pagination)`
    display: flex;
    text-align: center;
    justify-content: center;
    li {
        list-style: none;
        &:hover {
            background-color: ${props => props.pagiBGColor || "white"};
        }
    }
    a {
        /* color: black; */
        color: ${props => props.pagiColor || "black"};
        float: left;
        padding: 4px 4px;
        text-decoration: none;
        border: white 1px solid;
        width: 20px;
    }
    &:hover {
        color: white;
    }
`