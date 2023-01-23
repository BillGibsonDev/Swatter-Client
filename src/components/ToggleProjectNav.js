// styled
import styled from "styled-components";

// images
import RoundMenu from "../assets/icons/dot-menu-white.png";

// functions
import { toggleProjectSideNav } from "../functions/toggleProjectNav";

import { useLocation } from "react-router-dom";

export const ToggleProjectNav = ({projectSideNavRef}) => {

  const location = useLocation();

  const handleArrow = () => {
    let element = document.getElementById("arrow");
    element.classList.toggle("rotate");
  };

  const handleLocation = () => {
    let screen = window.innerWidth;
    let check = location.pathname.includes('/projects/')
    if(!check && screen > 834){
      return 'none';
    } else if (!check) {
      return 'none';
    } else {
      return 'block';
    }
  }

  let screen = window.innerWidth;

  return (
    <StyledButton id='arrow-button' style={{display: screen < 834 ? handleLocation() : "none"}} onClick={() => { handleArrow(); toggleProjectSideNav(projectSideNavRef); }}>
      <img id='arrow' src={RoundMenu} alt='Project Menu' />
      <span className='tooltiptext'>Project Menu</span>
    </StyledButton>
  )
}

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 50%;
  .tooltiptext {
    visibility: hidden;
    width: 100%;
    min-width: 160px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 105%;
  }
  @media (max-width: 834px) {
    display: block;
  }
  img {
    transition: 0.2s;
    width: 30px;
    height: 30px;
  }
  #arrow-button:hover .tooltiptext,
  #arrow-button:active .tooltiptext {
    visibility: visible;
    transition-delay: 1s;
  }
  .rotate {
    transform: rotate(180deg);
    transition: 0.2s;
  }
`;