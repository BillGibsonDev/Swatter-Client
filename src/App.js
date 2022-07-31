import { useState, useEffect } from "react";
import axios from "axios";

// styles
import GlobalStyles from "./GlobalStyles";

// components
import Nav from "./components/Nav";

// pages
import HomePage from './pages/HomePage/HomePage.js';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import AddProjectPage from "./pages/AddProjectPage";
import RegisterUserPage from "./pages/RegisterUserPage.js";
import EditProjectPage from "./pages/EditProjectPage";
import BugPage from "./pages/BugPage.js";
import AddBugPage from "./pages/AddBugPage.js";
import SprintsPage from "./pages/Sprints/SprintsPage.js";
import DetailsPage from "./pages/DetailsPage";

// react router
import { Route, Routes, useNavigate } from 'react-router-dom';
import EditBugPage from "./pages/EditBugPage";

function App() {

	const [ password, setPassword ] = useState('');
	const [ user, setUser] = useState('');
  	const [ username, setUsername] = useState('');
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ role, setRole ] = useState("");
	const [ isLoading, setLoading ] = useState(false);

	const navigate = useNavigate();

	const handleTokens = () => {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null) {
			navigate("/LoginPage");
		} else {
			tokenPW = password;
			tokenUser = username;
		}
		// Update session storage
		sessionStorage.setItem("tokenPW", tokenPW);
		sessionStorage.setItem("tokenUser", tokenUser);
	}

	useEffect(() =>{
		reloadLogin();
		// eslint-disable-next-line
	},[])

	const login = () => {
		setLoading(true)
		axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: username,
			password: password,
		})
		.then(function(response){
			setUser(username);
			setLoggedIn(true);
			setLoading(false);
			handleTokens();
			navigate("/");
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: username, 
					password: password,
				})
				.then((response) => {
					setRole(response.data);
				})
			} else {
				alert("Wrong Username or Password");
			}
		})
		.catch(function (error) {
			console.log(error);
			alert("Wrong Username or Password");
			setLoading(false);
		});
	}

	const logout = () => {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
		setLoggedIn(false);
		setUser("");
		setPassword('');
		setUsername("");
		navigate("/LoginPage");
	}

	const confirmAdmin = () => {
		axios.post(`${process.env.REACT_APP_ADMIN_CONFIRM_URL}`, {
			role: role,
		})
		.then(function(response){
			if (response.data !== "Role Confirmed"){
				alert("You do not have this permission!");
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
				setLoggedIn(false);
				navigate("/LoginPage");
			} 
		})
	}

	const confirmRole = () => {
		axios.post(`${process.env.REACT_APP_ROLE_CONFIRM_URL}`, {
			role: role,
		})
		.then(function(response){
			if (response.data !== "Role Confirmed" ){
				alert("Role was not confirmed");
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
				setLoggedIn(false);
				navigate("/LoginPage");
			}
		})
	}

	const reloadLogin = () => {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		setLoading(true);
		if (tokenPW === null && tokenUser === null) {
			navigate("/LoginPage");
			setLoading(false);
			setLoggedIn(false);
		} else {
			axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: tokenUser,
			password: tokenPW,
		})
		.then(function(response){
			let tokenPW = sessionStorage.getItem("tokenPW");
			let tokenUser = sessionStorage.getItem("tokenUser");
			setUser(tokenUser);
			setLoading(false);
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: tokenUser, 
					password: tokenPW,
				})
				.then((response) => {
					setLoggedIn(true);
					setRole(response.data);
				})
			}
		})
		.catch(function (error) {
			console.log(error);
			navigate("/LoginPage");
			setLoggedIn(false);
		});
	}}
	
	return (
		<>
			<GlobalStyles />
			{ 
				!isLoggedIn 
				? <>
					<LoginPage 
						login={login}
						setUsername={setUsername}
						setPassword={setPassword}
						handleTokens={handleTokens}
						isLoading={isLoading}
					/>
				</>
				: <>
					<Nav 
						role={role}
						logout={logout}
					/>
					<Routes>
						<Route 
							path='/' exact 
							element={
								<HomePage
									user={user}
									role={role}
									confirmRole={confirmRole} 
								/>
							} 
						/>
						<Route 
							path="/:projectId/:bugId" exact
							element={
								<BugPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/> 
							}
						/>
						<Route 
							path="/:projectId/:bugId/edit" exact
							element={
								<EditBugPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/> 
							}
						/>
						<Route 
							path="/projects/:projectId" 
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
							path="/projects/:projectId/sprints" 
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
							path="/AddProjectPage" exact 
							element={
								<AddProjectPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/>
							} 
						/>
						<Route 
							path="/EditProject/:projectId" exact
							element={
								<EditProjectPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/>
							}
						/>
						<Route 
							path='/:projectId/AddBugPage' exact
							element={
								<AddBugPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/>
							}
						/>
						<Route 
							path='/:projectId/details' exact
							element={
								<DetailsPage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/>
							}
						/>
						<Route 
							path="/ProfilePage" exact
							element={
								<ProfilePage
									user={user}
									role={role}
									confirmRole={confirmRole}
								/>
							}
						/>
						<Route 
							path="/RegisterUserPage" exact
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
			}
		</>
	);
}
export default App;
