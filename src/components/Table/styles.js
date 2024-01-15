import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 10px 15px 0px #00000010;
    border: 1px solid #f5f6f7;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
`

export const Table = styled.table`
    width: 100%;
    border-spacing: 0;
`

export const THead = styled.thead`
    & th:first-child {
        text-transform: uppercase;
    };
    & tr {
        background: #f5f6f8;
    };
    & th {
        padding: 12px;
        color: #7b8894;
        font-weight: 500;
        font-size: 14px;
    }
`

export const TBody = styled.tbody`
    position: relative;
    & > tr:not(:last-child) > td {
        border-bottom: 1px dotted #f2f3f4 !important;
    };
    & td {
        padding: 12px;
        text-align: center;
        font-size: 14px;
        color: #202b36;
    }
`

export const Error = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    & > span {
        font-size: 16px;
        font-weight: 400;
    }
`