import styled from "styled-components";


export const MainTicketSearchWrapper = styled.form `
    margin-top: 10vh;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 575px) {
        justify-content: start;
        align-items: center;
        flex-direction: column;
    }
`

export const InputSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 2px;
    width: 20vw;
    height: 40px;
    margin-right: 10px;
    @media (max-width: 575px) {
       margin-bottom: 10px;
       width: 50%;
       margin-right: 0;
    }
`

export const DatePickerActivateField = styled.div `
    color: orange;
    font-weight: 600;
    position: relative;
    background-color: #fff;
    cursor: pointer;
    width: 20vw;
    height: 40px;
    border-radius: 4px;
    margin-right: 1px;
    text-align: center;
    line-height: 35px;
    @media (max-width: 575px) {
       margin-right: 0;
    }
`
export const CalendarWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
