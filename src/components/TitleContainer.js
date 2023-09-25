import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

import { BackButton } from "./BackButton.js";

export const TitleContainer = ({ title, samePage, stateChanger }) => {

    return (
        <StyledTitle>
            <BackButton samePage={samePage} stateChanger={stateChanger} />
            <h1>{title}</h1>
        </StyledTitle>
    )
}

const StyledTitle = styled.article`
    display: flex;
    align-items: center;
    min-width: 50%;
    width: auto;
    h1 {
		font-size: ${palette.titleSize};
		color: #ffffff;
        margin-left: 6px;
        @media (max-width: 640px) {
            font-size: 1.2em;
        }
    }
`;