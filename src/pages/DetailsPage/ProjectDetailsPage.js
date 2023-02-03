import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// router
import { useParams } from "react-router-dom";

// loaders
import Loader from "../../loaders/Loader.js";

// components
import { BreadCrumbs } from "../../components/Breadcrumbs.js";

//sections
import ProjectDetails from "./sections/ProjectDetails/ProjectDetails.js";
import EditProject from "./sections/EditProjectDetails/EditProject.js";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();

  const [ project, setProject ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);

  useEffect(() => {
    const getProject = () => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [ projectId, editing ]);

  return (
    <StyledDetails>
      {
        isLoading ? <Loader />
       : 
        <>
          <BreadCrumbs 
            projectId={projectId}
            projectTitle={project.projectTitle}
            title={'Details'}
          />
          {
            editing ? 
            <EditProject
              isLoading={isLoading}
              setLoading={setLoading}
              project={project}
              projectId={projectId}
              setEditing={setEditing}
            />
            : <ProjectDetails
              isLoading={isLoading}
              setLoading={setLoading}
              project={project}
              projectId={projectId}
              setEditing={setEditing}
            />
          }
        </>
      }
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
    padding: 0;
    margin: 20px 5% 0 15%;
  }
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