import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #FFFFFF90;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Spinner = styled.div`
    width: 24px;
    height: 24px;
    animation: rotate 1s linear infinite;
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
`