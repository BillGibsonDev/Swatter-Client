import { useState, useRef } from "react";
import axios from "axios";

// styles
import GlobalStyles from "./GlobalStyles";

// components
import { Nav }from "./components/Nav";
import Alert from "./components/Alert";

// pages
import HomePage from "./pages/HomePage/HomePage.js";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import MainBugPage from "./pages/BugPage/MainBugPage.js";
import CreateBugPage from "./pages/CreateBugPage/CreateBugPage.js";
import SprintsPage from "./pages/Sprints/SprintsPage.js";
import ProjectDetailsPage from "./pages/DetailsPage/ProjectDetailsPage.js";
import ArchivePage from "./pages/ArchivePage/Archive";
import { FeaturesPage } from "./pages/FeaturesPage/FeaturesPage";
import ProjectActivityPage from "./pages/ActivityPage";
import SignupPage from "./pages/SignupName";

// router
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from 'react-redux';
import { handleUser } from './redux/actions/user.js';

function App() {
  
  const projectSideNavRef = useRef();

  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   let token = sessionStorage.getItem("token");
  //   let username = sessionStorage.getItem("username");
  //   const handlePageReload = (token) => {
  //     setLoading(true);
  //     setTimeout(() => {
  //       axios.post(`${process.env.REACT_APP_BASE_URL}/users/validateTokens`, { token: token })
  //       .then((response) => {
  //         if(response.data === 'Token Not Valid'){
  //           setLoggedIn(false);
  //           setLoading(false);
  //           sessionStorage.clear();
  //           navigate("/LoginPage");
  //         } else {
  //           setLoggedIn(true);
  //           setLoading(false);
  //           dispatch(handleUser(username, response.data, token));
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         setLoggedIn(false);
  //         setLoading(false);
  //         localStorage.clear();
  //         navigate("/LoginPage");
  //       });
  //     }, 1000);
  //   }
  //   if(token){
  //     handlePageReload(token);
  //   }
  // }, [ navigate, dispatch ]);

  const login = () => {
    if(!password || !username){

    } else {
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
        .catch((err) => {
          console.log(err);
          localStorage.clear();
          setLoading(false);
          setLoggedIn(false);
          navigate("/login");
        });
    }
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
              login={login}
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
      <Nav logout={logout} projectSideNavRef={projectSideNavRef} />
      <Routes>
        <Route path='/' exact element={ <HomePage /> } />
        <Route path='/:projectId/:bugId' exact element={ <MainBugPage /> }  />
        <Route path='/projects/:projectId' exact element={ <ProjectPage projectSideNavRef={projectSideNavRef} /> } />
        <Route path='/project/:projectId/sprints' exact element={ <SprintsPage /> } />
        <Route path='/CreateProjectPage' exact element={ <CreateProjectPage /> } />
        <Route path='/:projectId/CreateBugPage' exact element={ <CreateBugPage /> } />
        <Route path='/:projectId/details' exact element={ <ProjectDetailsPage /> } />
        <Route path='/ProfilePage' exact element={ <ProfilePage /> } />
        <Route path='/:projectId/archive' exact element={ <ArchivePage />} />
        <Route path='/features' exact element={ <FeaturesPage />} />
        <Route path='/:projectId/activity' exact element={ <ProjectActivityPage />} />
      </Routes>
    </>
  );
}
export default App;
