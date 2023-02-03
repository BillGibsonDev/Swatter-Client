// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// images
import Edit from "../../../assets/icons/editIconWhite.png";

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
      <h5 id='status'><span>Status: </span>{ sprint.status === "" ? 'None' : sprint.status }</h5>
      <div className='info-container'>
          <h5><span>Updated:</span> {sprint.updated}</h5>
          {
            !sprint.endDate ? <></>
            : <h5><span>End date: </span>{handleEndDate(sprint.endDate)}</h5>
          }
          <h5 id='status'><span>Goal: </span>{ sprint.goal === "" ? 'None' : sprint.goal }</h5>
      </div>
    </StyledTitleContainer>
  );
}

const StyledTitleContainer = styled.article`
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 10vh;
      margin: 20px 0;
      @media (max-width: 450px) {
        margin-top: 20px;
      }
      .title-container {
        display: flex;
        width: 100%;
        max-width: 600px;
        margin-right: auto;
        align-items: center;
        h4 {
          color: white;
          font-size: 30px;
          margin-top: auto;
          margin-right: 16px;
        }
        button {
          width: 30px;
          height: 30px;
          z-index: 3;
          background: none;
          border: none;
          @media (max-width: 450px) {
            margin-bottom: 0;
            width: 24px;
            height: 24px;
          }
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
      }
      #status {
        width: 100%;
        color: white;
        @media (max-width: 450px) {
          margin-bottom: 6px;
        }
        span {
          color: ${palette.helperGrey};
        }
      }
      .info-container {
        margin-right: auto;
        h5 {
          color: white;
          @media (max-width: 450px) {
            margin-bottom: 6px;
          }
          span {
            color: ${palette.helperGrey};
          }
        }
      }
    }
  }
`;