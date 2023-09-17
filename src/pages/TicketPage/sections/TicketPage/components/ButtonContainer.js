// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

export const ButtonContainer = () => {

  const handleTabs = (e, section) => {
    let i;
    let tabs = document.getElementsByClassName("ticket-page-tabs");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.display = "none";
    }
    let tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(section).style.display = "block";
    e.currentTarget.className += " active";
  };

  return (
    <StyledButtonContainer>
      <button className='tablinks active' onClick={(e) => { handleTabs(e, "comments"); }}>Comments</button>
      <button className='tablinks' onClick={(e) => { handleTabs(e, "updates"); }}>Updates</button>
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
    border-bottom: 2px solid white;
    width: 80%;
    button {
      border: 1px solid ${palette.helperGrey};
      font-size: 16px;
      border-radius: 0;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      cursor: pointer;
      padding: 8px 12px;
    }
    .active {
      background: black;
      color: white;
    }
`;