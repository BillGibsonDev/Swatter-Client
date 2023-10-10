// styled 
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables.js';

// images
import SearchIcon from '../assets/images/bugMicroYaleBlue.png';

export const Searchbar = ({ setSearchPhrase }) => {

  return (
    <StyledSearchbar>
        <img src={SearchIcon} alt="Search" />
        <input type="text" id="search" placeholder='Search' onChange={(e) => { setSearchPhrase(e.target.value)}} />
    </StyledSearchbar>
  )
}

const StyledSearchbar = styled.form`
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 4px;
    border-radius: 6px;
    width: 100%;
    max-width: 450px;
    height: 2em;
    &:hover {
        outline: 2px solid ${palette.helperGrey} ;
    }
    img {
        width: 15px;
        height: 15px;
    }
    input {
        background: none;
        border: none;
        text-indent: 10px;
        transition:0.3s;
        width: 100%;
        &:focus {
            outline: none;
            text-indent: 6px;
        }
    }
`;