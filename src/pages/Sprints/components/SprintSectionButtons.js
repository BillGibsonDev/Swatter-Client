// styled
import styled from "styled-components";
import { StyledButton } from "../../../styled/StyledButton";

export const SprintSectionButtons = ({ options, setCreating, setSearchSprint }) => {

  return (
    <StyledArticle>
      <StyledButton onClick={() => { setCreating(true); }}>New Sprint</StyledButton>
      <select onChange={(e) => { setSearchSprint(e.target.value); }}>
      <option value=''></option>
      {
        options.map((sprint, key) => {
          return (
            <option key={key} id={sprint._id} value={`${sprint.title}`}>
              {sprint.title}
            </option>
          );
        })
      }
      </select>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
    display: flex;
    width: auto;
    button {
      margin: 0 4px;
      height: 30px;
    }
    select {
      margin: 0;
      cursor: pointer;
      height: 30px;
      width: 200px;
      padding-left: 4px;
      option {
        font-size: 1em;
      }
    }
`;