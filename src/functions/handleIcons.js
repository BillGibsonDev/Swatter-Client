import { useState } from "react";
import styled from "styled-components";

// icons
import Bug from '../assets/icons/bugWhite.png';
import Task from '../assets/icons/taskIcon.png';
import Feature from '../assets/icons/featureYaleBlue.png';
import Redesign from '../assets/icons/designWHITE.png';
import Enhancement from '../assets/icons/cog.png';

export const HandleIcons = ({ tag }) => {

    const handleIconStyle = (tag) => {
        const iconObj = {
            image: null,
            background: null,
        };

        if(tag === 'Bug'){
            iconObj.image = Bug;
            iconObj.background = '#00786c';
        } else if(tag === 'Task'){
            iconObj.image = Task;
            iconObj.background = '#ff4c4c';
        } else if (tag === 'Redesign'){
            iconObj.image = Redesign;
            iconObj.background = '#9e579d';
        } else if (tag === 'Feature'){
            iconObj.image = Feature;
            iconObj.background = '#b59c0a';
        } else if(tag === 'Enhancement'){
            iconObj.image = Enhancement;
            iconObj.background = '#0091ff';
        }
        return iconObj;
    }

    const [ icon ] = useState(handleIconStyle(tag));

  return (
    <StyledIcon style={{ background: icon.background }}>
        <img src={icon.image} alt={tag} />
    </StyledIcon>
  )
}

const StyledIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    min-width: 26px;
    border-radius: 4px;
    img {
        width: 70%;
        height: 70%;
    }
`;
