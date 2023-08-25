// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// images
import Edit from "../../../assets/icons/editIconWhite.png";

// functions
import { handleDate } from "../../../functions/handleDates";

export const TitleContainer = ({ sprint, setEditing }) => {
  
  const handleEndDate = (x) => {
    let newArr = x.split(/[ -]+/);
    return `${newArr[1]}/${newArr[2]}/${newArr[0]}`;
  };

  return (
    <StyledTitleContainer>
      <div className='title-container'>
        <h4>{sprint.title}</h4>
        <button onClick={() => { setEditing(true); }} >
          <img id='edit-button' src={Edit} alt='edit' />
        </button>
      </div>
      <div className='info-container'>
        <h5 id='status'><span>Status: </span>{ sprint.status === "" ? 'None' : sprint.status }</h5>
        <h5><span>Updated:</span> { handleDate(sprint.updated) }</h5>
        <h5><span>End date: </span>{!sprint.endDate ? 'None' : handleEndDate(sprint.endDate)}</h5>
        <h5 id='status'><span>Goal: </span>{ sprint.goal === "" ? 'None' : sprint.goal }</h5>
      </div>
    </StyledTitleContainer>
  );
}

const StyledTitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  .title-container {
    display: flex;
    width: 100%;
    max-width: 600px;
    align-items: center;
    h4 {
      color: white;
      font-size: 2em;
      margin-top: auto;
      margin-right: 16px;
    }
    button {
      width: 20px;
      height: 20px;
      background: none;
      border: none;
    }
    #edit-button {
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  #status {
    width: 100%;
    color: white;
    span {
      color: ${palette.helperGrey};
    }
  }
  .info-container {
    margin: 10px 0;
    h5 {
      color: white;
      margin-bottom: 6px;
      font-size: 1em;
      span {
        color: ${palette.helperGrey};
      }
    }
  }
`;