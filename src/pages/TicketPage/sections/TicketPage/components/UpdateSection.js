// styled
import styled from 'styled-components';
import * as palette from '../../../../../styled/ThemeVariables.js';

export const UpdateSection = ({ updates }) => {

    if(!updates || updates.length === 0){
        return (
            <StyledArticle className='ticket-page-tabs' id="updates">
                <h2>No updates yet..</h2>
            </StyledArticle>
        )
    }

    return (
        <StyledArticle className='ticket-page-tabs' id="updates">
            <div className="updates-wrapper">
                { 
                    updates.map((update, index) => {
                        return (
                            <div key={index}>
                                <p>{update.description}</p>
                            </div>  
                        )
                    })
                }
            </div>
        </StyledArticle>
    )
}

const StyledArticle = styled.article`
    display: none;
    height: 100%;
    width: 100%;
    margin: 20px auto auto 0;
    @media (max-width: 834px){
        width: 90%;
    }
    h2 {
        color: ${palette.helperGrey};
        font-size: 1em;
        font-weight: 400;
    }
    .updates-wrapper {
        display: flex;
        width: 70%;
        height: auto;
    }
`;