import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// icons
import * as icons from '../assets/IconImports.js';

export const ConfirmAlert = ({ isVisible, setIsVisible, removeMember, removedMember }) => {

    if(!isVisible){
        return null;
    };

    return (
        <StyledAlert>
            <div className="alert-wrapper">
                <h1>Swatter</h1>
                <h2>Project Management</h2>
                <div className="alert-container">
                    <img src={icons.TriangleWarning} alt={'warning'} />
                    <p>Are you sure you want to remove member?</p>
                    <div className="button-container">
                        <button onClick={() => { removeMember(removedMember);}}>Okay</button>
                        <button onClick={setIsVisible(false)}>Cancel</button>
                    </div>
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
    background: ${palette.accentColorTransparent};
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
            .button-container {
                display: flex;
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
                    &:hover {
                        background: black;
                    }
                }
            }
        }
    }
`;