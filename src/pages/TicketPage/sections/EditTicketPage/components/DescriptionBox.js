// styled
import styled from "styled-components";
import * as palette from '../../../../../styled/ThemeVariables.js';

export const DescriptionBox = ({setDescription, description}) => {

  return (
    <StyledDescriptionBox>
        Description
        <textarea
            name='description'
            id='description'
            // key={description}
            defaultValue={description}
            cols='30'
            rows='10'
            onChange={(e) => {
                setDescription(e.target.value);
            }}
        />
    </StyledDescriptionBox>
  );
}

const StyledDescriptionBox = styled.label`
    display: flex;
    flex-direction: column;
    color: white;
    margin: 10px 0;
    font-weight: 400;
    font-size: ${palette.labelSize};
    width: 100%;
    max-width: 500px;
    textarea {
        padding: 2px;
        font-size: 1em;
    }
`;