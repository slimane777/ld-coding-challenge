import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    gap: 16px;
    margin-top: 10px;
`

export const Select = styled.select`
    border: none
`

export const Span = styled.span`
    font-size: 14px;
    color: #202b36;
`

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    & > svg {
        color: #28333d;
    };
    &:disabled > svg {
        color: #acb6bf;
    }
`