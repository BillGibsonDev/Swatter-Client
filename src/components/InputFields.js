import styled from "styled-components"
import * as palette from '../styled/ThemeVariables.js';

export const InputFields = ({ type, label, required, func, options }) => {

    if(type === 'select'){
        return(
            <StyledContainer>
                <label>{label} { required ? <span>*required</span> : <></> }</label>
                <select onChange={(e) => { func(e.target.value); }}>
                    <option value=''>None</option>
                    {
                        options.map((color, key) => {
                            return ( <option key={key} value={color.toLowerCase()}>{color}</option>)
                        })
                    }
                </select>
            </StyledContainer>
        )
    }

    if(type === 'textarea'){
        return(
            <StyledContainer>
                <label>{label} { required ? <span>*required</span> : <></> }</label>
                <textarea onChange={(e) => { func(e.target.value); }} />
            </StyledContainer>
        )
    }

    return (
        <StyledContainer>
            <label>{label}{ required ? <span>*required</span> : <></> }</label>
            <input type={type} onChange={(e) => { func(e.target.value); }}/>
        </StyledContainer>
    )
}

const StyledContainer = styled.article`
    max-width: 500px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    label {
        display: flex;
        align-items: center;
        color: white;
        width: 100%;
        max-width: 500px;
        span {
            font-size: .8em;
            color: #c95a5a;
            margin-left: 6px;
        }
    }
    input, select, textarea {
        width: 100%;
        padding: 2px;
        font-size: .8em;
        background: ${palette.helperGrey};
        height: 30px;
        option {
            text-transform: capitalize;
            padding-left: 2px;
        }
    }
    textarea {
        min-height: 100px;
    }
    
`;