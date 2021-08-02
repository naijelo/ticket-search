import styled from "styled-components";
import Calendar from "./Calendar";

export const DatePicker = styled(Calendar)`
    position: absolute;
    margin-top: 50px;
    overflow: hidden;
    z-index: 10;
    background-color: #01a8d4;

    td {
        box-sizing: border-box;
    }
    .day {
        &:hover {
        box-shadow: 0 0 0 1px white;
        cursor: pointer;
        }
    }
    @media (max-width: 575px) {
        left: 100px;
        top: 100px;
    }
`
