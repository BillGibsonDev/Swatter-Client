// styled 
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import SearchIcon from '../../../assets/images/bugMicroYaleBlue.png';

export const Searchbar = ({ setSearchPhrase }) => {

    const handleClearForm = (e) => {
        e.preventDefault();
        setSearchPhrase('')
        document.getElementById('search').value = ''
    }

  return (
    <StyledSearchbar>
        <img src={SearchIcon} alt="Search" />
        <input type="text" id="search" placeholder='Search Bugs' onChange={(e) => { setSearchPhrase(e.target.value)}} />
        <button onClick={(e) => {handleClearForm(e) }}>Clear</button>
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
    button {
        background: white;
        font-weight: 700;
        font-size: .8em;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        transition: 0.2s;
        width: 100px;
        height: 28px;
        &:hover{
            color: white;
            background: black;
        }
    }
`;