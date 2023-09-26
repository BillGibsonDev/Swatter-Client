import { useState } from "react";

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// icons
import * as icons from '../../../../assets/IconImports.js';

// loaders
import Loader from "../../../../loaders/Loader.js";

// function
import { handleDate } from '../../../../functions/handleDates.js';
import { MemberList } from "../../MemberList.js";
import { TitleContainer } from "../../../../components/TitleContainer.js";

export default function ProjectDetails({ project, isLoading, setEditing, user }) {

  const [ addingMember, setAddingMember ] = useState(false);
  const [ members, setMembers ] = useState(project.members);

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledSection>
      <div className="title-container">
        <TitleContainer 
          title={project.title}
          samePage={false}
        />
        <button id="edit-btn" onClick={() => { setEditing(true)} }><img src={icons.Edit} alt="Edit" /></button>
      </div>
      { project.image ? <img id="project-image" src={project.image} alt={project.title} /> : <></> }
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
      <h6><span>Description:</span> {project.description ? project.description : 'None'}</h6>
      <MemberList 
        members={members} 
        setMembers={setMembers}
        projectId={project._id} 
        user={user}
        setAddingMember={setAddingMember}
        addingMember={addingMember}
      />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 20px auto;
  .title-container {
    display: flex;
    align-items: center;
    #edit-btn {
      width: 30px;
      height: 30px;
      border: none;
      background: none;
      transition: 0.2s ease-in-out;
      margin-left: 10px;
      cursor: pointer;
      padding: 2px;
      &:hover {
        background: black;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  #project-image {
    width: 300px;
    margin: 10px 0;
  }
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
`;