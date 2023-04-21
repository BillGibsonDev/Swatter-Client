// styled
import styled from "styled-components";

// functions
import { handleDate } from "../../../../../functions/handleDates";

export const InfoContainer = ({ bug }) => {

  return (
    <StyledBugPage>
        <h2><span>Creator: </span>{bug.author}</h2>
        <h2><span>Created: </span>{handleDate(bug.date)}</h2>
        <h2><span>Updated: </span>{handleDate(bug.lastUpdate)}</h2>
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
        font-size: 1em;
        display: flex;
        margin: 4px 6px 4px 0;
        font-weight: 400;
        span {
            color: #cecece;
            font-weight: 400;
            font-size: 1em;
            margin-right: 6px;
        }
    }
`;