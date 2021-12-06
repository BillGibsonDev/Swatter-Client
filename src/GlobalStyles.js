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
button, label, input, textarea {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 1px;
    padding: 2px;
}
`;

export default GlobalStyles;