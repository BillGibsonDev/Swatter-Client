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

// react router
import { Route, Routes, useNavigate } from "react-router-dom";
import EditBugPage from "./pages/EditBugPage";

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
    handlePageReload(token);
  }, []);

  const handlePageReload = (token) => {
    setLoading(true);
    setLoggedIn(false);
    setTimeout(() => {
      axios.post(`${process.env.REACT_APP_BASE_URL}/validateTokens`,
      {
        token: token
      }
    )
      .then((response) => {
        console.log(response)
        if(response.status === 200){
          setLoggedIn(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error)
        localStorage.clear();
        sessionStorage.clear();
        setLoggedIn(false);
        setLoading(false);
      });
    }, 1000)
  }


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
          .then((response) => {
            console.log(response)
            if(response){
              navigate("/");
              setLoggedIn(true);
            }
          })
          .catch((error) => {
            console.log(error);
            localStorage.clear();
            sessionStorage.clear();
            alert("Wrong Username or Password");
            setLoading(false);
            setLoggedIn(false);
          });
        })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        sessionStorage.clear();
        alert("Wrong Username or Password");
        setLoading(false);
        setLoggedIn(false);
      });
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    setLoggedIn(false);
    setUser("");
    setPassword("");
    setUsername("");
    navigate("/LoginPage");
  };

  const confirmAdmin = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ADMIN_CONFIRM_URL}`,
        {
          role: role,
        }
      )
      .then(function (response) {
        if (response.data !== "Role Confirmed") {
          alert("You do not have this permission!");
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
          setLoggedIn(false);
          navigate("/LoginPage");
        }
      });
  };

  const confirmRole = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ROLE_CONFIRM_URL}`,
        {
          role: role,
        }
      )
      .then(function (response) {
        if (response.data !== "Role Confirmed") {
          alert("Role was not confirmed");
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
          setLoggedIn(false);
          navigate("/LoginPage");
        }
      });
  };

  return (
    <>
      <GlobalStyles />
      {!isLoggedIn ? (
        <>
          <LoginPage
            login={login}
            setUsername={setUsername}
            setPassword={setPassword}
            handleTokens={handleTokens}
            isLoading={isLoading}
          />
        </>
      ) : (
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
                <HomePage user={user} role={role} confirmRole={confirmRole} />
              }
            />
            <Route
              path='/:projectId/:bugId'
              exact
              element={
                <BugPage user={user} role={role} confirmRole={confirmRole} />
              }
            />
            <Route
              path='/:projectId/:bugId/edit'
              exact
              element={
                <EditBugPage
                  user={user}
                  role={role}
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmRole={confirmRole}
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
                  confirmAdmin={confirmAdmin}
                />
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}
export default App;
