import { useState, useRef } from "react";
import axios from "axios";

// styles
import GlobalStyles from "./GlobalStyles";
import styled from 'styled-components';

// components
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import ProjectSideNav from "./components/ProjectSideNav";

// pages
import HomePage from "./pages/HomePage/HomePage.js";
import ProfilePage from "./pages/ProfilePage";

import MainBugPage from "./pages/BugPage/MainBugPage.js";
import CreateBugPage from "./pages/CreateBugPage/CreateBugPage.js";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import SprintsPage from "./pages/Sprints/SprintsPage.js";
import ProjectDetailsPage from "./pages/DetailsPage/ProjectDetailsPage.js";
import ArchivePage from "./pages/ArchivePage/Archive";
import { FeaturesPage } from "./pages/FeaturesPage/FeaturesPage";
import ProjectActivityPage from "./pages/ActivityPage";
import CommentsPage from "./pages/CommentsPage/CommentsPage";

// logged out pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// router
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from 'react-redux';
import { handleUser } from './redux/actions/user.js';
import { showAlert } from "./redux/actions/alert";

const App = () => {
  
  const projectSideNavRef = useRef();

  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = () => {
    if(!username){ dispatch(showAlert('Username', 'warning')); return; };
    if(!password){ dispatch(showAlert('Password', 'warning')); return; };
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,
      {
        username: username,
        password: password,
      }
    )
    .then((response) => {
      if(response.status === 200){
        dispatch(handleUser( response.data.token, response.data.username, response.data.id ));
        setLoggedIn(true);
        setLoading(false);
        navigate("/");
      }
      })
    .catch((error) => {
      console.log(error);
      localStorage.clear();
      setLoading(false);
      setLoggedIn(false);
      dispatch(showAlert(error, 'error'))
      navigate("/login");
    });
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/login");
    setLoading(false);
  };

  if(!isLoggedIn){
    return (
      <>
        <Alert />
        <GlobalStyles />
        <Routes>
          <Route path='/login' exact element={ 
            <LoginPage
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
              isLoading={isLoading}
            /> 
          } />
          <Route path='/signup' exact element={ 
            <SignupPage
              isLoading={isLoading}
              setLoading={setLoading}
            />     
          } />
          <Route path='/' element={<Navigate replace to="/login" />}  />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Alert />
      <GlobalStyles />
      <StyledApp>
        <Nav projectSideNavRef={projectSideNavRef} />
        <ProjectSideNav projectSideNavRef={projectSideNavRef} />
        <Routes>
          <Route path='/' exact element={ <HomePage /> } />
          <Route path='/:userId/projects/:projectId/bugs/:bugId' exact element={ <MainBugPage /> }  />
          <Route path='/:userId/projects/:projectId' exact element={ <ProjectPage /> } />
          <Route path='/:userId/projects/:projectId/sprints' exact element={ <SprintsPage /> } />
          <Route path='/:userId/create-project' exact element={ <CreateProjectPage /> } />
          <Route path='/:userId/projects/:projectId/create-bug' exact element={ <CreateBugPage /> } />
          <Route path='/:userId/projects/:projectId/details' exact element={ <ProjectDetailsPage /> } />
          <Route path='/users/:userId/profile' exact element={ <ProfilePage logout={logout} /> } />
          <Route path='/:userId/projects/:projectId/archive' exact element={ <ArchivePage />} />
          <Route path='/features' exact element={ <FeaturesPage />} />
          <Route path='/:userId/projects/:projectId/activity' exact element={ <ProjectActivityPage />} />
          <Route path='/:userId/projects/:projectId/comments' exact element={ <CommentsPage />} />
        </Routes>
      </StyledApp>
    </>
  );
}

const StyledApp = styled.section`
  display: flex;
`;

export default App;

