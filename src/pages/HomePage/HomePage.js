import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// components
import HomePageLoader from "../../loaders/HomePageLoader";
import { Searchbar } from '../../components/Searchbar.js';
import { SearchProjectTable } from "./components/SearchProjectTable.js";
import { ProjectTable } from "./components/ProjectTable.js";

export const HomePage = () => {
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ projectSearchPhrase, setProjectSearchPhrase ] = useState('');

  useEffect(() => {
    const getProjects = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECTS_URL}`)
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProjects();
  }, []);

  return (
    <StyledHomePage>
      {
        isLoading ? <HomePageLoader />
        : <>
            <Searchbar setSearchPhrase={setProjectSearchPhrase} />
            <div className='projects-container'>
              {
                projectSearchPhrase 
                ? <SearchProjectTable projectSearchPhrase={projectSearchPhrase} projects={projects} />
                : <ProjectTable projects={projects} />
              }
            </div>
        </>
      }
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: auto;
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
  @media (max-width: 838px) {
    width: 80%;
    max-width: 86vw;
    margin-left: 90px;
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
    margin-top: 20px;
  }
`;
