import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

export default function RegisterUserPage({role, confirmAdmin}) {

	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");
	const [ userRole, setUserRole ] = useState("");

	useEffect(() => {
		confirmAdmin(role);
		setUserRole(process.env.REACT_APP_GUEST_SECRET);
		// eslint-disable-next-line
	}, [role, userRole])

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
	height: 80vh;
	width: 100%;
	max-width: 1000px;
	margin: auto;
	h1 {
		font-size: 3em;
		color: #ffffff;
        margin-bottom: 40px;
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
                font-weight: bold;
				color: white;
                @media (max-width: 1150px){
                    font-size: 1.2em;
                }
            }
            input {
                width: 200px;
                margin-bottom: 20px;
                border-radius: 4px;
                @media (max-width: 1150px){
                    width: 50%;
                }
                @media (max-width: 750px){
                    width: 70%;
                }
				@media (max-width: 550px){
                    width: 90%;
                }
            }
            button {
                width: 200px;
                cursor: pointer;
                margin: 0 20px;
                background: #d1d1d1;
                border: none;
                border-radius: 4px;
                font-weight: 700;
                @media (max-width: 1150px){
                    font-size: 1.2em;
                }
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #000000;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
        }
`;