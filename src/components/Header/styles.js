import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    background: #FFF;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 1px 1px 30px #00000020;
    border: 1px solid #f9fafa;
    display: flex;
    flex-direction: column;
    gap: 16px
`

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
`

export const Input = styled.div`
    position: relative;
    flex: 1;
    & > input {
        width: 100%;
        box-sizing: border-box;
        height: 39px;
        border: 1px solid #eff0f1;
        padding-left: 35px;
        border-radius: 8px;
    }
    & > input::placeholder {
        color: #a2afba;
    }
    & > svg {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #a2afba;
    }
`