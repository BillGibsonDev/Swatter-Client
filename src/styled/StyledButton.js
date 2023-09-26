import styled from "styled-components";
import * as palette from './ThemeVariables';

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 300px;
  height: 40px;
  cursor: pointer;
  border: ${palette.greyBorder};
  border-radius: ${palette.borderRadius};
  font-size: 1em;
  font-weight: 700;
  background: ${palette.accentColor};
  color: #fff;
  margin: 20px auto;
  &:hover {
    color: #ffffff;
    cursor: pointer;
    background: #000000;
    border: 1px solid #ffffff;
    transition: 0.2s;
    transform: scale(1.01);
  }
`;