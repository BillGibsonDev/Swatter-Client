import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/icons/arrowUp.png';

export const BackButton = ({ samePage, stateChanger }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if(samePage){
        stateChanger(false);
    } else {
        navigate(-1);
    }
  };

  return (
    <StyledButton 
        onClick={goBack}>
        <img id="arrow-img" src={Arrow} alt="" />
    </StyledButton>
  );
}

const StyledButton = styled.button`
    display: flex;
    color: white;
    font-size: inherit;
    border: none;
    background: none;
    max-width: 100px;
    width: auto;
    height: auto;
    align-items: center;
    cursor: pointer;
    #arrow-img {
        transform: rotate(0.75turn);
        width: 30px;
        height: 30px;
    }
`;