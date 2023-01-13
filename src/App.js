import { useState, useEffect } from "react";
import axios from "axios";

// styles
import GlobalStyles from "./GlobalStyles";

// components
import Nav from "./components/Nav";

// pages
import HomePage from "./pages/HomePage/HomePage.js";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import RegisterUserPage from "./pages/RegisterUserPage.js";
import EditProjectPage from "./pages/EditProjectPage";
import BugPage from "./pages/BugPage/BugPage.js";
import CreateBugPage from "./pages/CreateBugPage.js";
import { SprintsPage } from "./pages/Sprints/SprintsPage.js";
import DetailsPage from "./pages/DetailsPage";
import EditBugPage from "./pages/EditBugPage";

// router
import { Route, Routes, useNavigate } from "react-router-dom";

// redux
import { useDispatch } from 'react-redux';
import { handleUser } from './redux/actions/user.js';

//functions
import { handleTokens } from "./functions/handleTokens";

function App() {
  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  onbeforeunload = (event) => { logout(); };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");
    const handlePageReload = (token) => {
      setLoading(true);
      setTimeout(() => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/validateTokens`,
        {
          token: token
        }
      )
        .then((response) => {
          if(response.data === 'Token Not Valid'){
            setLoggedIn(false);
            setLoading(false);
            localStorage.clear();
            sessionStorage.clear();
            navigate("/LoginPage");
          } else {
            setLoggedIn(true);
            setLoading(false);
            dispatch(handleUser(username, response.data));
          }
        })
        .catch((error) => {
          console.log(error)
          setLoggedIn(false);
          setLoading(false);
          localStorage.clear();
          sessionStorage.clear();
          navigate("/LoginPage");
        });
      }, 1000);
    }
    if(token){
      handlePageReload(token);
    }
  }, [ navigate, dispatch ]);

  const login = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_LOGIN_URL}`,
        {
          username: username,
          password: password,
        }
      )
      .then((response) => {
        setLoading(false);
        handleTokens(response.data, username);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/validateTokens`,
            {
              token: response.data
            }
          )
          .then((res) => {
            if(res.status === 200){
              setLoggedIn(true);
              dispatch(handleUser(username, res.data));
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.clear();
            sessionStorage.clear();
            alert("Wrong Username or Password");
            setLoading(false);
            setLoggedIn(false);
            navigate("/LoginPage");
          });
        })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        sessionStorage.clear();
        alert("Wrong Username or Password");
        setLoading(false);
        setLoggedIn(false);
        navigate("/LoginPage");
      });
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
    setPassword("");
    setUsername("");
    navigate("/LoginPage");
    setLoading(false);
  };

  return (
    <>
      <GlobalStyles />
      {!isLoggedIn ? 
        <>
          <LoginPage
            login={login}
            setUsername={setUsername}
            setPassword={setPassword}
            isLoading={isLoading}
          />
        </>
      : 
        <>
          <Nav logout={logout} />
          <Routes>
            <Route
              path='/'
              exact
              element={ <HomePage /> }
            />
            <Route
              path='/:projectId/:bugId'
              exact
              element={ <BugPage /> }
            />
            <Route
              path='/:projectId/:bugId/edit'
              exact
              element={ <EditBugPage /> }
            />
            <Route
              path='/projects/:projectId'
              exact
              element={ <ProjectPage /> }
            />
            <Route
              path='/projects/:projectId/sprints'
              exact
              element={ <SprintsPage /> }
            />
            <Route
              path='/CreateProjectPage'
              exact
              element={ <CreateProjectPage /> }
            />
            <Route
              path='/EditProject/:projectId'
              exact
              element={ <EditProjectPage /> }
            />
            <Route
              path='/:projectId/CreateBugPage'
              exact
              element={ <CreateBugPage /> }
            />
            <Route
              path='/:projectId/details'
              exact
              element={ <DetailsPage /> }
            />
            <Route
              path='/ProfilePage'
              exact
              element={ <ProfilePage /> }
            />
            <Route
              path='/RegisterUserPage'
              exact
              element={ <RegisterUserPage /> }
            />
          </Routes>
        </>
      }
    </>
  );
}
export default App;
