import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// functions
import { handleAlert } from "../functions/handleAlert.js";

export const Alert = ({AlertRef, message}) => {
  return (
    <StyledAlert ref={AlertRef} onClick={() => { handleAlert(AlertRef)}}>
        <div className="alert-container">
            <h1>{message}</h1>
            <button>Okay</button>
        </div>
    </StyledAlert>
  )
}

const StyledAlert = styled.div`
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 700px;
    z-index: 100;
    text-align: center;
    margin: auto;
    border-radius: 12px;
    transition: 0.2s;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    @media(max-width: 650px){
        width: 100%;
        height: 100%;
    }
    .alert-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: 20px;
        background: white;
        border-radius: 12px;
        width: 100%;
        border: 20px solid black;
        box-shadow: 6px 6px 10px #00000090;
        @media(max-width: 650px){
            width: 90%;
        }
        h1 {
            color: black;
            @media(max-width: 650px){
                font-size: 1.5em;
            }
        }
        button {
            margin-top: 20px;
            width: 50%;
            font-size: 1em;
            padding: 6px 0;
            background: ${palette.accentColor};
            border: none;
            border-radius: 6px;
            color: white;
            cursor: pointer;
        }
    }
`;