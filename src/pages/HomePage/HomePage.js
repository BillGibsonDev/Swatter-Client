import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// components
import Project from "./components/Project.js";
import HomePageLoader from "../../loaders/HomePageLoader";

export default function HomePage({ user, role, confirmRole }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECTS_URL}`
        )
        .then(function (response) {
          setProjects(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          throw error;
        });
    };
    getProjects();
  }, []);

  return (
    <StyledHomePage>
      {isLoading === true ? (
        <HomePageLoader />
      ) : (
        <>
          <div className='projects-container'>
            {projects
              .slice()
              .reverse()
              .map((project, key) => {
                return (
                  <Project
                    projects={projects}
                    projectId={project._id}
                    title={project.projectTitle}
                    date={project.startDate}
                    author={project.author}
                    projectImage={project.projectImage}
                    key={key}
                    user={user}
                    role={role}
                    confirmRole={confirmRole}
                  />
                );
              })}
          </div>
        </>
      )}
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
  margin-top: 2%;
  min-height: 80vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1280px) {
    margin-left: 80px;
  }
  @media (max-width: 1024px) {
    margin-left: 80px;
  }
  @media (max-width: 834px) {
    width: 900px;
    max-width: 86vw;
    margin-left: 90px;
  }
  @media (max-width: 820px) {
    width: 760px;
  }
  @media (max-width: 768px) {
    width: 710px;
  }
  @media (max-width: 428px) {
    width: 360px;
    margin-left: 70px;
  }
  @media (max-width: 414px) {
    width: 340px;
  }
  @media (max-width: 390px) {
    width: 320px;
  }
  @media (max-width: 375px) {
    width: 310px;
  }
  @media (max-width: 360px) {
    width: 295px;
  }
  .projects-container {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
    @media (max-width: 1050px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 450px) {
      grid-template-columns: 75vw;
      row-gap: 20px;
    }
  }
`;
