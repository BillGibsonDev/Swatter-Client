import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html {
margin: auto;
scroll-behavior: smooth;
max-width: 1200px;
background: #0f4d92;;
font-family: 'Poppins', sans-serif;
letter-spacing: 1px;
line-height: 1.5;
    @media (max-width: 1450px){
        font-size: 90%;
    }
    @media (max-width: 1450px){
        font-size: 80%;
    }
    @media (max-width: 750px){
        font-size: 70%;
    } 
}
ul {
    list-style-type: none;
}
a {
    text-decoration: none;
}
button, a, label, input, textarea {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    padding: 2px;
    border-radius: 4px;
}

#back-button {
    width: 100px;
    color: #ffffff;
    border-radius: 4px;
    font-weight: 700;
    background: #0f4d92;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    padding: 2.5px 6px;
    @media (max-width: 420px){
        width: 80px;
    }
    &:hover{
        color: #000000;
        cursor: pointer;
        background: #d1d1d1;
        transition: 0.2s;
        transform: scale(1.01);
    }
}
`;

export default GlobalStyles;