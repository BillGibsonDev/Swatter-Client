import { useState, useRef } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styles
import GlobalStyles from "./GlobalStyles";
import styled from 'styled-components';

// components
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import ProjectSideNav from "./components/ProjectSideNav";

// pages
import HomePage from "./pages/HomePage/HomePage.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import MainTicketPage from "./pages/TicketPage/MainTicketPage.js";
import CreateTicketPage from "./pages/CreateTicketPage/CreateTicketPage.js";

import ProjectPage from "./pages/ProjectPage/ProjectPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import SprintsPage from "./pages/Sprints/SprintsPage.js";
import ProjectDetailsPage from "./pages/DetailsPage/ProjectDetailsPage.js";
import ArchivePage from "./pages/ArchivePage/Archive";
import { GuidePage } from "./pages/GuidePage/GuidePage";
import ProjectActivityPage from "./pages/ActivityPage";
import CommentsPage from "./pages/CommentsPage/CommentsPage";
import UnknownPath from "./pages/404Page";

// logged out pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// router
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// redux
import { useDispatch, connect } from 'react-redux';
import { handleUser } from './redux/actions/user.js';
import { showAlert } from "./redux/actions/alert";

// functions
import { handleTokens } from "./functions/handleTokens";
import useTokenRefresh from "./functions/useTokenRefresh";

const App = ({ user, isLoggedIn }) => {
  
  const tokenLogin = useTokenRefresh()

  if(isLoggedIn && !user){
    tokenLogin()
  }

  const projectSideNavRef = useRef();

  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ isLoading, setLoading ] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleLogin = (event) => {
    event.preventDefault();
    validationSchema.validate({ username, password })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        if(response.status === 200){
          handleTokens(response.data.token, response.data.username, response.data.id);
          dispatch(handleUser( response.data.token, response.data.username, response.data.id ));
          navigate("/");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        setLoading(false);
        dispatch(showAlert(error.response.data, 'error'));
      });
    })
    .catch((validationError) => {
			dispatch(showAlert(validationError, 'error'));
		});
  };

    const handleGuestLogin = () => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,
        {
          username: 'Guest',
          password: 'Guest1',
        }
      )
      .then((response) => {
        if(response.status === 200){
          handleTokens(response.data.token, response.data.username, response.data.id);
          dispatch(handleUser( response.data.token, response.data.username, response.data.id ));
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        setLoading(false);
        dispatch(showAlert(error, 'error'));
      });
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
              handleGuestLogin={handleGuestLogin}
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
          <Route path='/home' element={<Navigate replace to="/login" />}  />
          <Route path="*" element={<UnknownPath /> }  />
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
          <Route path='/login' element={<Navigate replace to="/home" />}  />
          <Route path='/' element={<Navigate replace to="/home" />}  />
          <Route path='/home' exact element={ <HomePage /> } />
          <Route path='/:userId/projects/:projectId/tickets/:ticketId' exact element={ <MainTicketPage /> }  />
          <Route path='/:userId/projects/:projectId' exact element={ <ProjectPage /> } />
          <Route path='/:userId/projects/:projectId/sprints' exact element={ <SprintsPage /> } />
          <Route path='/:userId/create-project' exact element={ <CreateProjectPage /> } />
          <Route path='/:userId/projects/:projectId/create-ticket' exact element={ <CreateTicketPage /> } />
          <Route path='/:userId/projects/:projectId/details' exact element={ <ProjectDetailsPage /> } />
          <Route path='/users/:userId/profile' exact element={ <ProfilePage /> } />
          <Route path='/:userId/projects/:projectId/archive' exact element={ <ArchivePage />} />
          <Route path='/guide' exact element={ <GuidePage />} />
          <Route path='/:userId/projects/:projectId/activity' exact element={ <ProjectActivityPage />} />
          <Route path='/:userId/projects/:projectId/comments' exact element={ <CommentsPage />} />

          <Route path="*" element={<UnknownPath /> }  />
        </Routes>
      </StyledApp>
    </>
  );
}

const StyledApp = styled.section`
  display: flex;
`;

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.token,
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);