import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// icons
import * as icons from '../assets/IconImports';

// functions
import { handleDeleteAlert } from "../functions/handleDeleteAlert.js";

export const DeleteAlert = ({ DeleteAlertRef, title, deleteFunction, id }) => {
  return (
    <StyledAlert ref={DeleteAlertRef}>
        <div className="alert-container">
            <img src={icons.TriangleWarning} alt={'warning'} />
            <p>Are you sure you want to delete {title}?</p>
            <div className="button-container">
                <button id="yes-btn" onClick={() => { deleteFunction(id); handleDeleteAlert(DeleteAlertRef)}}>Yes</button>
                <button id="cancel-btn" onClick={() => { handleDeleteAlert(DeleteAlertRef)}}>Cancel</button>
            </div>
        </div>
    </StyledAlert>
  )
}

const StyledAlert = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    transition: 0.2s;
    display: none;
    align-items: center;
    justify-content: center;
    background: ${palette.accentColorTransparent};
    text-align: center;
    .alert-container {
        position: fixed;
        width: 70%;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: white;
        border: 20px solid red;
        box-shadow: 6px 6px 10px #00000090;
        border-radius: 12px;
        padding: 20px;
        @media (max-width: 834px) {
            width: 90%;
        }
        p {
            font-size: 1em;
            color: #0f4c92;
            text-align: center;
        }
        img {
            width: 50px;

        }
        p {
            font-size: 1em;
            color: #000000;
        }
        .button-container {
            width: 90%;
            display: flex;
            justify-content: space-between;
            margin: auto;
            button {
                margin-top: 20px;
                width: 30%;
                max-width: 150px;
                font-size: 1em;
                padding: 6px 0;
                background: ${palette.accentColor};
                border: none;
                border-radius: 6px;
                color: white;
                cursor: pointer;
                &:hover {
                    background: black;
                }
            }
            #cancel-btn {
                background: red;
                margin-left: auto;
            }
        }
    }
`;