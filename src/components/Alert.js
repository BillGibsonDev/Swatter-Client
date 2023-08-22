import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// redux
import { connect } from "react-redux";
import { hideAlert } from "../redux/actions/alert.js";

const Alert = ({ alert, hideAlert }) => {

    if(!alert.isVisible){
        return null;
    }

    return (
        <StyledAlert>
            <div className="alert-container">
                <p>{alert.message}</p>
                <button onClick={hideAlert}>Okay</button>
            </div>
        </StyledAlert>
    )
}

const StyledAlert = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 700px;
    z-index: 1000;
    text-align: center;
    margin: auto;
    border-radius: 12px;
    transition: 0.2s;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
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

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  hideAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);