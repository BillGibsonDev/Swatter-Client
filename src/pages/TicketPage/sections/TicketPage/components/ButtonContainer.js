// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables.js";

export const ButtonContainer = (images) => {

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
    document.getElementById(section).style.display = "flex";
    e.currentTarget.className += " active";
  };

  return (
    <StyledButtonContainer>
      <button className='tablinks active' onClick={(e) => { handleTabs(e, "comments"); }}>Comments</button>
      {
        images.length === 0 ? <></>
        :  <button className='tablinks' onClick={(e) => { handleTabs(e, "images"); }}>Images</button>
      }
    </StyledButtonContainer>
  );
}

const StyledButtonContainer = styled.article`
  width: 100%;
  button {
    border: ${palette.greyBorder};
    font-size: .8em;
    border-radius: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    cursor: pointer;
    padding: 8px 12px;
  }
  .active {
    background: ${palette.accentColor};
    color: white;
  }
`;