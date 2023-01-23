// styled 
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// images
import SearchIcon from '../assets/images/bugMicroYaleBlue.png';

export const Searchbar = ({ setSearchPhrase }) => {

    const handleClearForm = (e) => {
        e.preventDefault();
        setSearchPhrase('');
        document.getElementById('search').value = '';
    }

  return (
    <StyledSearchbar>
        <img src={SearchIcon} alt="Search" />
        <input type="text" id="search" placeholder='Search' onChange={(e) => { setSearchPhrase(e.target.value)}} />
        <button onClick={(e) => {handleClearForm(e) }}>Clear</button>
    </StyledSearchbar>
  )
}

const StyledSearchbar = styled.form`
    position: absolute;
    top: 10px;
    background: white;
    display: flex;
    align-items: center;
    padding-left: 4px;
    border-radius: 6px;
    &:hover {
        outline: 2px solid ${pallette.helperGrey} ;
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
        width: 210px;
        &:focus {
            outline: none;
            text-indent: 6px;
        }
    }
    button {
        background: #f0f0f0;
        font-weight: 700;
        font-size: .8em;
        border: none;
        cursor: pointer;
        transition: 0.2s;
        width: 60px;
        height: 28px;
        margin-left: 6px;
        border-radius: 0;
        border-radius: 0 4px 4px 0;
        &:hover{
            color: white;
            background: black;
        }
    }
`;