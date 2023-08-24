// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// loaders
import Loader from "../../../../loaders/Loader.js";

// function
import { handleDate } from '../../../../functions/handleDates.js';

export default function ProjectDetails({ project, isLoading, setEditing }) {

  return (
    <StyledSection>
      {
        isLoading ? <Loader />
       : 
        <>
          <div className='title-container'>
            <h1>{project.title}</h1>
            <button id="toggle-edit-button" onClick={() => { setEditing(true)}}><img src={EditIcon} alt='edit' /></button>
          </div>
          <div className='container'>
            <h6><span>Started:</span> {handleDate(project.startDate)}</h6>
            <h6><span>Last Update:</span> {handleDate(project.lastUpdate)}</h6>
            {
              project.link ? <a href={project.link} target='_blank' rel='noreferrer'><span>Website:</span> {project.link}</a>
              : <h6><span>Website:</span> None</h6>
            }
            {
              project.repository ? <a href={project.repository} target='_blank' rel='noreferrer'><span>Repository:</span> {project.repository}</a>
              : <h6><span>Repository:</span> None</h6>
            }
            <h6><span>Description:</span> {project.description}</h6>
          </div>
        </>
      }
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 20px auto;
  .title-container {
    display: flex;
    max-width: 400px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    h1 {
      color: white;
      font-size: ${palette.titleSize};
    }
  }
  .container {
    display: flex; 
    flex-direction: column;
    h6, a {
      margin: 10px 0;
      font-size: 1em;
      color: white;
      span {
        color: ${palette.helperGrey};
      }
    }
    a:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;