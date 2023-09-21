import { useState } from "react";

// styled
import styled from "styled-components";
import * as palette from "../../../../styled/ThemeVariables.js";

// loaders
import Loader from "../../../../loaders/Loader.js";

// function
import { handleDate } from '../../../../functions/handleDates.js';
import { MemberList } from "../../MemberList.js";
import { TitleContainer } from "../../../../components/TitleContainer.js";

export default function ProjectDetails({ project, isLoading, editing, setEditing, user }) {

  const [ addingMember, setAddingMember ] = useState(false);
  const [ members, setMembers ] = useState(project.members);

  console.log(user.id === project.ownerId)

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledSection>
      <TitleContainer 
        title={project.title}
        type={ user.id === project.ownerId ? 'edit' : '' }
        stateChanger={setEditing}
        state={editing}
      />
      <div className='container'>
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
      </div>
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
  }
`;