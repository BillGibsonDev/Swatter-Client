// styled
import styled from "styled-components";

export const InfoContainer = ({bug}) => {
  return (
    <StyledBugSection>
      <h2><span>Creator: </span>{bug.author}</h2>
      <h2><span>Created: </span>{bug.date}</h2>
      <h2><span>Updated: </span>{bug.lastUpdate}</h2> 
    </StyledBugSection>
  );
}

const StyledBugSection = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0 10px 0;
  @media (max-width: 700px) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  }
  h2 {
    color: white;
    font-size: 1em;
    display: flex;
    width: 90%;
    font-weight: 400;
    margin: 6px 0;
    span {
      color: #cecece;
      font-weight: 400;
      font-size: 1em;
      margin-right: 6px;
    }
  }
`;