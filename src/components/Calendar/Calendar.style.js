import styled from "styled-components";
import Calendar from "./Calendar";

export const DatePicker = styled(Calendar)`
    position: absolute;
    margin-top: 50px;

    td {
        box-sizing: border-box;
        -moz-box-sizing:border-box;

        &:hover {
            box-shadow: 0 0 0 1px white;
            cursor: pointer;
        }
    }
`
