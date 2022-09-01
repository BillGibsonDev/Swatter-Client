import styled from "styled-components";

export const StyledButton = styled.button`
    width: 100px;
    height: 30px;
    color: #000000;
    border-radius: 4px;
    font-weight: 700;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    padding: 2.5px 6px;
    border: none;
    transition: 0.2s;
    @media (max-width: 420px){
        width: 85px;
    }
    &:hover{
        color: #ffffff;
        cursor: pointer;
        background: #000000;
        transition: 0.2s;
        transform: scale(1.01);
    }
`;