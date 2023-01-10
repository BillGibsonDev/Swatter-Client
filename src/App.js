import { useState, useEffect } from "react";
import axios from "axios";

// styles
import GlobalStyles from "./GlobalStyles";

// components
import Nav from "./components/Nav";

// pages
import HomePage from "./pages/HomePage/HomePage.js";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import RegisterUserPage from "./pages/RegisterUserPage.js";
import EditProjectPage from "./pages/EditProjectPage";
import BugPage from "./pages/BugPage/BugPage.js";
import CreateBugPage from "./pages/CreateBugPage.js";
import SprintsPage from "./pages/Sprints/SprintsPage.js";
import DetailsPage from "./pages/DetailsPage";
import EditBugPage from "./pages/EditBugPage";

// react router
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTokens = (token) => {
    sessionStorage.setItem("token", token);
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
      const handlePageReload = (token) => {
        setTimeout(() => {
          axios.post(`${process.env.REACT_APP_BASE_URL}/validateTokens`,
          {
            token: token
          }
        )
          .then((response) => {
            if(response.status === 200){
              setRole(response.data);
              setLoggedIn(true);
              setLoading(false);
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
  }, [ navigate ]);

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
      .then(function (response) {
        setUser(username);
        setLoading(false);
        handleTokens(response.data);
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}/validateTokens`,
            {
              token: `${response.data}`
            }
          )
          .then((res) => {
            if(res.status === 200){
              navigate("/");
              setLoggedIn(true);
              setRole(res.data);
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
    setUser("");
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
            handleTokens={handleTokens}
            isLoading={isLoading}
          />
        </>
      : 
        <>
          <Nav 
            role={role} 
            logout={logout} 
          />
          <Routes>
            <Route
              path='/'
              exact
              element={
                <HomePage user={user} role={role} />
              }
            />
            <Route
              path='/:projectId/:bugId'
              exact
              element={
                <BugPage user={user} role={role} />
              }
            />
            <Route
              path='/:projectId/:bugId/edit'
              exact
              element={
                <EditBugPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/projects/:projectId'
              exact
              element={
                <ProjectPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/projects/:projectId/sprints'
              exact
              element={
                <SprintsPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/CreateProjectPage'
              exact
              element={
                <CreateProjectPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/EditProject/:projectId'
              exact
              element={
                <EditProjectPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/:projectId/CreateBugPage'
              exact
              element={
                <CreateBugPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/:projectId/details'
              exact
              element={
                <DetailsPage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/ProfilePage'
              exact
              element={
                <ProfilePage
                  user={user}
                  role={role}
                />
              }
            />
            <Route
              path='/RegisterUserPage'
              exact
              element={
                <RegisterUserPage
                  user={user}
                  role={role}
                />
              }
            />
          </Routes>
        </>
      }
    </>
  );
}
export default App;
