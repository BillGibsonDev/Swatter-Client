import { useState, useEffect } from "react";

// styled
import styled from "styled-components";

// components
import BreadCrumbs from "../../components/Breadcrumbs";
import CreateSprint from "./sections/CreateSprint";
import EditSprint from "./sections/EditSprint";
import { SprintSection } from "./sections/SprintSection";

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

// functions
import { getProject } from "../../functions/getProject";

// redux
import { connect } from "react-redux";

const SprintsPage = ({ user }) => {
  const { projectId } = useParams();

  const [ searchSprint, setSearchSprint ] = useState(false);
  const [ options, setOptions ] = useState([]);
  const [ project, setProject ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);
  const [ creating, setCreating ] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject( user, projectId );
        setProject(projectData);
        setOptions(projectData.sprints);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProject();
  }, [ projectId, user, editing, creating ]);

  if(isLoading){
    return <Loader />;
  };

  return (
    <StyledPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={project.title} 
        title={'Sprints'}
      />
      {
        creating ? <CreateSprint
          setCreating={setCreating}
          projectId={projectId}
        />
        : editing ? <EditSprint
          projectId={projectId}
          project={project}
          searchSprint={searchSprint}
          editing={editing}
          setEditing={setEditing}
          setSearchSprint={setSearchSprint}
          setOptions={setOptions}
        />
        : <SprintSection
          project={project}
          options={options}
          searchSprint={searchSprint}
          setCreating={setCreating}
          setEditing={setEditing}
          setSearchSprint={setSearchSprint}
          setOptions={setOptions}
        />
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  max-height: 80vh;
  width: 90%;
  margin: 0 auto;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SprintsPage);