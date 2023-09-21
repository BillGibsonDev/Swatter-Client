import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// icons
import * as icons from '../assets/IconImports.js';

// redux
import { connect } from "react-redux";
import { hideAlert } from "../redux/actions/alert.js";

const Alert = ({ alert, hideAlert }) => {

    const alertPrompts = {
        success: {
            title: 'Success',
            icon: icons.CircleCheckbox,
        },
        error: {
            title: `${alert.message}`,
            icon: icons.ChatboxWarning,
        },
        warning: {
            title: `Warning - A ${alert.message} is required.`,
            icon: icons.TriangleWarning,
        },
    }

    if(!alert.isVisible){
        return null;
    }

    const prompt = alertPrompts[alert.type].title || 'Hmm.. seems something went wrong somewhere.'
    const iconImage = alertPrompts[alert.type].icon || icons.TriangleWarning;

    return (
        <StyledAlert>
            <div className="alert-wrapper" style={{ borderColor: alert.type !== 'success' ? 'red' : palette.accentColor }}>
                <h1>Swatter</h1>
                <h2>Project Management</h2>
                <div className="alert-container">
                    <img src={iconImage} alt={`${alert.type}`} />
                    <p>{prompt}</p>
                    <button onClick={hideAlert}>Okay</button>
                </div>
            </div>
        </StyledAlert>
    )
}

const StyledAlert = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1001;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .alert-wrapper {
        position: fixed;
        width: 70%;
        height: auto;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: white;
        border: 20px solid ${palette.accentColor};
        box-shadow: 6px 6px 10px #00000090;
        border-radius: 12px;
        @media (max-width: 834px) {
            width: 90%;
        }
        h1 {
            margin-top: 20px;
            font-size: 1.5em;
            color: #0f4d92;
            line-height: .9;
        }
        h2 {
            font-size: 1em;
            color: #0f4c92;
            text-align: center;
        }
        .alert-container {
            margin: 10px 0;
            img {
                width: 50px;

            }
            p {
                font-size: 1em;
                color: #000000;
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
                &:hover {
                    background: black;
                }
            }
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