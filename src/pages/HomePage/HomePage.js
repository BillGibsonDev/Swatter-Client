import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// components
import HomePageLoader from "../../loaders/HomePageLoader";
import { Searchbar } from '../../components/Searchbar.js';
import { SearchProjectTable } from "./components/SearchProjectTable.js";
import { ProjectTable } from "./components/ProjectTable.js";

// redux
import { connect } from "react-redux";

const HomePage = ({ user }) => {
  const [ projects, setProjects ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ projectSearchPhrase, setProjectSearchPhrase ] = useState('');

  useEffect(() => {
    const getProjects = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects`,
      {
        headers: {
          Authorization: user.token,
        }
      })
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getProjects();
  }, [ user ]);

  return (
    <StyledHomePage>
      {
        isLoading ? <HomePageLoader />
        : <>
            <Searchbar setSearchPhrase={setProjectSearchPhrase} />
            {
              projectSearchPhrase && projectSearchPhrase.length > 2
              ? <SearchProjectTable user={user} projectSearchPhrase={projectSearchPhrase} projects={projects} />
              : <ProjectTable projects={projects} user={user} />
            }
        </>
      }
    </StyledHomePage>
  );
}

const StyledHomePage = styled.section`
  width: 80%;
  max-width: 1200px;
  margin: 10px auto;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(HomePage);