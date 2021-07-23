import styled from "styled-components";
import Pagination from "./Pagination";

export const StyledPagination = styled(Pagination)`
    display: flex;
    text-align: center;
    justify-content: center;
    li {
        list-style: none;
    }
    a {
        color: black;
        float: left;
        padding: 4px 4px;
        text-decoration: none;
        border: white 1px solid;
        width: 20px;
    }
`