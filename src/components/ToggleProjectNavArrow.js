// styled
import styled from "styled-components";

// images
import arrowRight from "../assets/icons/arrowRight.png";

// functions
import { toggleProjectSideNav } from "../functions/toggleProjectNav";

export const ToggleProjectNavArrow = ({projectSideNavRef}) => {

    const handleArrow = () => {
      let element = document.getElementById("arrow");
      element.classList.toggle("rotate");
    };

  return (
    <StyledButton id='arrow-button' onClick={() => { handleArrow(); toggleProjectSideNav(projectSideNavRef); }}>
      <img id='arrow' src={arrowRight} alt='Project Menu' />
      <span className='tooltiptext'>Project Menu</span>
    </StyledButton>
  )
}

const StyledButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: none;
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