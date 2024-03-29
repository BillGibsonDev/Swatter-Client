// styled
import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// images
import RoundMenu from "../assets/icons/dot-menu-white.png";

// functions
import { toggleProjectSideNav } from "../functions/toggleProjectNav";

// router
import { useLocation } from "react-router-dom";

export const ToggleProjectNavButton = ({ projectSideNavRef }) => {

  const location = useLocation();

  const handleArrow = () => {
    let element = document.getElementById("arrow");
    element.classList.toggle("rotate");
  };

  const handleLocation = () => {
    let urlCheck = location.pathname.includes('/projects/');
    if(!urlCheck){
      return 'none';
    } else {
      return 'flex';
    }
  }

  return (
    <StyledButton id='arrow-button' style={{ display: handleLocation() }} onClick={() => { handleArrow(); toggleProjectSideNav(projectSideNavRef); }}>
      <img id='arrow' src={RoundMenu} alt='Project Menu' />
      <span className='tooltiptext'>Project Menu</span>
    </StyledButton>
  )
}

const StyledButton = styled.button`
  margin-bottom: 20px;
  padding: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    background: ${palette.accentColor};
  }
  .tooltiptext {
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    width: 100%;
    height: 100%;
    min-width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 6px 0;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 105%;
  }
  img {
    transition: 0.2s;
    width: 25px;
    height: 25px;
  }
  &:hover .tooltiptext,
  &:active .tooltiptext {
    visibility: visible;
    transition-delay: 1s;
  }
  .rotate {
    transform: rotate(180deg);
    transition: 0.2s;
  }
`;