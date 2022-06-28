import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        scroll-behavior: smooth;
        background: #124075;;
        font-family: 'Roboto Mono', monospace;
        letter-spacing: 1px;
        line-height: 1.5;
        @media (max-width: 1450px){
            font-size: 90%;
        }
        @media (max-width: 750px){
            font-size: 80%;
        } 
    }
    body {
        font-family: 'Roboto Mono', monospace;
    }
    ul {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
    button, a, label, input, textarea {
        font-family: 'Roboto Mono', monospace;
        letter-spacing: 1px;
        padding: 2px;
        border-radius: 4px;
    }
    h1 {
        line-height: normal;
    }

    #back-button {
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
    }
`;

export default GlobalStyles;