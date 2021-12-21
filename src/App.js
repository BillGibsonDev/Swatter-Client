import { useState, useEffect } from "react";
import axios from "axios";


// styles
import GlobalStyles from "./GlobalStyles";

// components
import Nav from "./components/Nav";

// pages
import HomePage from './pages/HomePage.js';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import BugPage from "./pages/BugPage";
import AddBugPage from "./pages/AddBugPage";
import AddProjectPage from "./pages/AddProjectPage";
import RegisterUserPage from "./pages/RegisterUserPage.js";
import EditProjectPage from "./pages/EditProjectPage";

// react router
import { Route, Switch, useHistory} from 'react-router-dom';

function App() {
	const [ password, setPassword ] = useState('');
	const [ user, setUser] = useState('');
  	const [ username, setUsername] = useState('');
	const [ isLoggedIn, setLoggedIn ] = useState(false);
	const [ role, setRole ] = useState("");
	const [ lastLogin, setLastLogin ] = useState("");
	const [ isLoading, setLoading ] = useState(false);

	const history = useHistory();

	function handleDate(){
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
        setLastLogin(date);
    }

	function handleTokens() {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null) {
			history.push("/LoginPage");
		} else {
			tokenPW = password;
			tokenUser = username;
		}
		// Update session storage
		sessionStorage.setItem("tokenPW", tokenPW);
		sessionStorage.setItem("tokenUser", tokenUser);
	}

	useEffect(() =>{
		handleDate();
		reloadLogin();
		// eslint-disable-next-line
	},[])

	function login () {
		setLoading(true)
		axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: username,
			password: password,
			lastLogin: lastLogin,
		})
		.then(function(response){
			setUser(username)
			setLoggedIn(true)
			setLoading(false)
			handleTokens()
			history.push("/");
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: username, 
					password: password,
				})
				.then((response) => {
					setRole(response.data)
				})
			} else {
				alert("Wrong Username or Password")
			}
		})
		.catch(function (error) {
			alert("Wrong Username or Password")
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
		history.push("/LoginPage");
	}

	function confirmAdmin () {
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
				history.push("/LoginPage");
			} 
		})
	}

	function confirmRole () {
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
				history.push("/LoginPage");
			}
		})
	}

	function reloadLogin() {
		setLoggedIn(true)
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null && tokenUser === null) {
			history.push("/LoginPage");
			setLoggedIn(false);
		} else {
			axios.post(`${process.env.REACT_APP_LOGIN_URL}`, {
			username: tokenUser,
			password: tokenPW,
		})
		.then(function(response){
			let tokenPW = sessionStorage.getItem("tokenPW");
			let tokenUser = sessionStorage.getItem("tokenUser");
			setUser(tokenUser)
			if (response.data === "LOGGED IN"){
				axios.post(`${process.env.REACT_APP_SET_ROLE_URL}`, {
					username: tokenUser, 
					password: tokenPW,
				})
				.then((response) => {
					setRole(response.data)
				})
			}
		})
		.catch(function (error) {
		throw error;
		});
	}}
	
	return (
		<>
			<GlobalStyles />
		{ 
			isLoggedIn === false ? (
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
					user={user}
					role={role}
					logout={logout}
					isLoggedIn={isLoggedIn}/>
				<Switch>
					<Route path={'/'} exact>
						<HomePage
							user={user}
							role={role}
							confirmRole={confirmRole}
							reloadLogin={reloadLogin}
						/>
					</Route>
					<Route path={"/projects/:projectId"} exact>
						<ProjectPage
							user={user}
							role={role}
							confirmRole={confirmRole}
							lastLogin={lastLogin}
						/>
					</Route>
					<Route path={"/AddProjectPage"} exact>
						<AddProjectPage
							user={user}
							role={role}
							confirmRole={confirmRole}
						/>
					</Route>
					<Route path={"/EditProject/:projectId"} exact>
						<EditProjectPage
							user={user}
							role={role}
							confirmRole={confirmRole}
						/>
					</Route>
					<Route path={"/ProfilePage"} exact>
						<ProfilePage
							user={user}
							role={role}
							confirmRole={confirmRole}
						/>
					</Route>
					<Route path={"/RegisterUserPage"} exact>
						<RegisterUserPage
							user={user}
							role={role}
							confirmAdmin={confirmAdmin}
						/>
					</Route>
					<Route path={'/:projectId/AddBugPage'} exact>
						<AddBugPage
							user={user}
							role={role}
							confirmRole={confirmRole}
						/>
					</Route> 
					<Route path={"/:projectId/:bugId"} exact>
						<BugPage
							user={user}
							role={role}
							confirmRole={confirmRole}
						/>  
					</Route> 
				</Switch>
			</>
		)}
	</>
	);
}
export default App;
