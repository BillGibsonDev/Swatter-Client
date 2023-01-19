import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// functions
import { handleDeleteAlert } from "../functions/handleDeleteAlert.js";

export const DeleteAlert = ({ DeleteAlertRef, title, deleteFunction }) => {
  return (
    <StyledAlert ref={DeleteAlertRef}>
        <div className="alert-container">
            <h1>Are you sure you want to delete {title}?</h1>
            <div className="button-container">
                <button id="yes-btn" onClick={() => { deleteFunction(); handleDeleteAlert(DeleteAlertRef)}}>Yes</button>
                <button id="no-btn" onClick={() => { handleDeleteAlert(DeleteAlertRef)}}>No</button>
            </div>
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
    transition: 0.2s;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .alert-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: 50px;
        background: white;
        border-radius: 12px;
        width: 90%;
        border: 20px solid black;
        box-shadow: 6px 6px 10px #00000090;
        h1 {
            font-size: 1em;
            color: black;
            @media(max-width: 650px){
                font-size: 1.5em;
            }
        }
        .button-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            button {
                margin-top: 20px;
                width: 30%;
                font-size: 1em;
                padding: 6px 0;
                background: ${palette.accentColor};
                border: none;
                border-radius: 6px;
                color: white;
                cursor: pointer;
            }
            #yes-btn {
                background: none;
                border: 1px solid #f50404;
                color: black;
            }
        }
    }
`;