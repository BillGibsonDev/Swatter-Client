// styled
import styled from "styled-components";

export const InfoContainer = ({ bug }) => {

  return (
    <StyledBugPage>
        <h2><span>Creator: </span>{bug.author}</h2>
        <h2><span>Created: </span>{bug.date}</h2>
        <h2><span>Updated: </span>{bug.lastUpdate}</h2>
    </StyledBugPage>
  );
}

const StyledBugPage = styled.article`
    width: 50%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 450px) {
        width: 100%;
    }
    h2 {
        color: white;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        margin: 4px 0;
        font-weight: 400;
        span {
            color: #cecece;
            font-weight: 400;
            font-size: 12px;
        }
    }
`;