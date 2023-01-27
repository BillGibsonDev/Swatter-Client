// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// loaders
import Loader from "../../../../loaders/Loader.js";

export default function ProjectDetails({ project, isLoading, setEditing}) {

  return (
    <StyledDetails>
      {
        isLoading ? <Loader />
       : 
        <>
          <div className='title-container'>
            <h1>{project.projectTitle}</h1>
            <button id="toggle-edit-button" onClick={() => { setEditing(true)}}><img src={EditIcon} alt='edit' /></button>
          </div>
          <div className='container'>
            <h6><span>Key:</span> {project.projectKey}</h6>
            <h6><span>Type:</span> {project.projectType}</h6>
            <h6><span>Description:</span> {project.description}</h6>
          </div>
          <div className='container'>
            <h6><span>Lead:</span> {project.projectLead}</h6>
            <h6><span>Started:</span> {project.startDate}</h6>
            <a href={project.repository} target='_blank' rel='noreferrer'><span>Repository:</span> {project.repository}</a>
            <a href={project.projectLink} target='_blank' rel='noreferrer'><span>Website:</span> {project.projectLink}</a>
          </div>
        </>
      }
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  height: 100%;
  width: 100%;
  margin: 20px auto;
  .title-container {
    display: flex;
    max-width: 300px;
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
      @media (max-width: 428px) {
        margin: 20px 0;
      }
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