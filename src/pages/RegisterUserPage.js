import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

export default function RegisterUserPage({role, confirmAdmin}) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");

	useEffect(() => {
		confirmAdmin(role);
		// eslint-disable-next-line
	}, [role])

    function registerUser() {
			if (password !== confirm ) {
				alert("Passwords don't match");
			} else {
				axios.post(`${process.env.REACT_APP_REGISTER_URL}`, {
					username: username,
					password: password,
					role: `${process.env.REACT_APP_GUEST_SECRET}`,
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
					<label>Username:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<label>Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
                    <label>Retype Password:</label>
					<input 
						type="text" 
						onChange={(event) => {
							setConfirm(event.target.value);
						}}
					/>
					{
                        role === process.env.REACT_APP_ADMIN_SECRET ? (
                            <button type="submit" onClick={registerUser}>Create User</button>
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
background: white;
height: 80vh;
width: 90%;
margin: auto;
border-radius: 12px;
	h1 {
		font-size: 3em;
		color: #0f4d92;
        margin-bottom: 40px;
    }
	.form-wrapper {
		display: flex;
		width: 50%;
		flex-direction: column;
		align-items: center;
		label {
			font-weight: bold;
		}
		input {
			width: 200px;
			margin-bottom: 20px;
		}
		button {
			width: 150px;
			font-weight: bold;
			font-size: 1.2em;
			letter-spacing: 1px;
			cursor: pointer;
		}
	}
`;