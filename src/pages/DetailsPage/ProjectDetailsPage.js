import { useState, useEffect } from "react";

// styled
import styled from "styled-components";

// router
import { useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

// loaders
import Loader from "../../loaders/Loader.js";

// components
import BreadCrumbs from "../../components/Breadcrumbs.js";

//sections
import ProjectDetails from "./sections/ProjectDetails/ProjectDetails.js";
import EditProject from "./sections/EditProjectDetails/EditProject.js";

// functiomns
import { getProject } from "../../functions/getProject.js";

const ProjectDetailsPage = ({ user }) => {
  const { projectId } = useParams();

  const [ project, setProject ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject( user, projectId );
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId, user ]);

  if( isLoading ){
    return <Loader />
  }

  return (
    <StyledPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={project.title}
        title={'Details'}
      />
      {
        editing && user.id === project.owner ? 
        <EditProject
          isLoading={isLoading}
          setLoading={setLoading}
          project={project}
          projectId={projectId}
          setEditing={setEditing}
          editing={editing}
          user={user}
        />
        : <ProjectDetails
          isLoading={isLoading}
          setLoading={setLoading}
          project={project}
          projectId={projectId}
          editing={editing}
          setEditing={setEditing}
          user={user}
        />
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  #toggle-edit-button {
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProjectDetailsPage);