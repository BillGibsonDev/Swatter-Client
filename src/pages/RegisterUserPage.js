import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

export default function RegisterUserPage({role, confirmAdmin}) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");
	const [ userRole, setUserRole ] = useState("");

	useEffect(() => {
		confirmAdmin(role);
		setUserRole(process.env.REACT_APP_GUEST_SECRET);
	}, [role, confirmAdmin, userRole])

    function registerUser() {
			if (password !== confirm ) {
				alert("Passwords don't match");
			} else {
				axios.post(`${process.env.REACT_APP_REGISTER_URL}`, {
					username: username,
					password: password,
					role: role,
					userRole: `${process.env.REACT_APP_GUEST_SECRET}`,
				})
				.then(function(response) {
					if(response.data !== "USER REGISTERED"){
						alert("Server Error - User was not created")
					} else {
						alert('User Created!');
					}
				})
			}
		}

	function unauthorized() {
        alert("You do not have permissions to do that!")
    }

	return (
		<StyledRegister>
			<h1>Register User</h1>
			<div className="form-wrapper">
				<label>Username
					<input 
						type="text" 
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
				</label>
				<label>Password
					<input 
						type="text" 
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</label>
				<label>Retype Password
					<input 
						type="text" 
						onChange={(event) => {
							setConfirm(event.target.value);
						}}
					/>
				</label>
				{
					role === process.env.REACT_APP_ADMIN_SECRET ? (
						<button type="submit" onClick={()=>{registerUser();}}>Create User</button>
					) : (    
						<button onClick={unauthorized}>Create User</button>
					)
				}
			</div>
		</StyledRegister>
	)
}

const StyledRegister = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 50vh;
	width: 100%;
	max-width: 1000px;
	margin: 50px auto;
	@media (max-width: 750px){
		margin: 20px auto;
	}
	h1 {
		font-size: 40px;
		color: #ffffff;
        margin-bottom: 20px;
    }
	.form-wrapper {
            display: flex;
            width: 90%;
            flex-direction: column;
            align-items: center;
            @media (max-width: 1150px){
                font-size: 1.2em;
            }
            label {
				display: flex;
				color: white;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 20px 0;
				font-size: ${pallette.subtitleSize};
				@media (max-width: 750px){
					font-size: ${pallette.paraSize};
				}
				input {
					width: 300px;
					height: 40px;
					border-radius: 4px;
					font-size: 18px;
					padding: 6px;
					background: ${pallette.helperGrey};
				}
			}
            button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 300px;
				height: 40px;
				cursor: pointer;
				border: none;
				border-radius: 4px;
				font-size: ${pallette.subtitleSize};
				font-weight: 700;
				background: #ffffff;
				color: ${pallette.accentColor};
				margin-top: 20px;
				&:hover{
					color: #ffffff;
					cursor: pointer;
					background: #000000;
					transition: 0.2s;
					transform: scale(1.01);
				}
				@media (max-width: 750px){
					font-size: ${pallette.paraSize};
				}
			}
        }
`;