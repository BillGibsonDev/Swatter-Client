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
    max-width: 60%;
    h1 {
		font-size: ${palette.titleSize};
		color: #ffffff;
    }
    button {
        width: 20px;
        height: 20px;
        border: none;
        background: none;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
`;