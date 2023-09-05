import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

import EditIcon from '../assets/icons/editIconWhite.png';

export const TitleContainer = ({ title, stateChanger, state, type }) => {

    if(!type){
        return (
            <StyledTitle>
                <h1>{title}</h1>
            </StyledTitle>
        )
    }

    if(type === 'cancel'){
        return (
            <StyledTitle>
                <h1>{title}</h1>
                <button onClick={() => { stateChanger(!state)}}>Cancel</button>
            </StyledTitle>
        )
    }

    return (
        <StyledTitle>
            <h1>{title}</h1>
            <button id="edit-btn" onClick={() => { stateChanger(!state)}}>
                <img src={EditIcon} alt={`edit ${title}`} />
            </button>
        </StyledTitle>
    )
}

const StyledTitle = styled.article`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px #ffffff solid;
    max-width: 50%;
    @media (max-width: 420px) {
        max-width: 90%;
        min-width: 300px;
    }
    h1 {
		font-size: ${palette.titleSize};
		color: #ffffff;
        @media (max-width: 420px) {
            font-size: 1em;
        }
    }
    button {
        padding: 2px 6px;
        cursor: pointer;
        @media (max-width: 420px) {
            font-size: 1em;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
    #edit-btn {
        border: none;
        background: none;
        width: 20px;
        height: 20px;
        padding: 0;
    }
`;