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

    return (
        <StyledTitle>
            <h1>{title}</h1>
            <button onClick={() => { stateChanger(!state)}}>
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
    h1 {
		font-size: ${palette.titleSize};
		color: #ffffff;
        width: 50%;
        @media (max-width: 450px) {
            font-size: 1.5em;
        }
    }
    button {
        width: 20px;
        height: 20px;
        border: none;
        background: none;
        cursor: pointer;
        margin-left: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
`;