import React from 'react'

// styled 
import styled from 'styled-components'
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import SearchIcon from '../../../assets/images/bugMicroYaleBlue.png'

export const Searchbar = ({project}) => {

  return (
    <StyledSearchbar>
        <img src={SearchIcon} alt="" />
        <input type="text" placeholder='Search Bugs'/>
    </StyledSearchbar>
  )
}

const StyledSearchbar = styled.form`
width: 200px;
position: absolute;
top: 20px;
background: white;
display: flex;
align-items: center;
padding-left: 4px;
border-radius: 6px;
    &:hover {
        outline: 2px solid ${pallette.helperGrey} ;
    }
    img {
        width: 20px;
        height: 20px;
    }
    input {
        background: none;
        border: none;
        text-indent: 10px;
        padding: 5px 3px;
        transition:0.3s;
        &:focus {
            outline: none;
            text-indent: 6px;
        }
    }
`;