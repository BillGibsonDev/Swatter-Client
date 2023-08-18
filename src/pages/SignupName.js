import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import { StyledButton } from '../styled/StyledButton';
import * as palette from '../styled/ThemeVariables';

// router
import { Link, useNavigate } from 'react-router-dom';

// loaders
import LoginLoader from '../loaders/LoginLoader';

export default function SignupPage({ isLoading, setLoading, setMessage, handleAlert, AlertRef }) {

  const navigate = useNavigate();

  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ confirmEmail, setConfirmEmail ] = useState("");

  const handleSignup = () => {
    if(!password || !username){
      setMessage("Enter A Username or Password");
      handleAlert(AlertRef);
      return;
    } 
    if( password !== confirmPassword){
      setMessage("Passwords do not match");
      handleAlert(AlertRef);
      return;
    }
    if( email !== confirmEmail){
      setMessage("Emails do not match");
      handleAlert(AlertRef);
      return;
    }
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`,
      {
        username: username,
        email: email,
        password: password,
      }
    )
    .then((response) => {
      console.log(response)
        if(response.status === 200){
          setMessage("Account created!");
          handleAlert(AlertRef);
          setLoading(false);
          navigate("/login");
        } else {
          setMessage("Account not created!");
          handleAlert(AlertRef);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        setMessage("Error - Account not created");
        handleAlert(AlertRef);
        setLoading(false);
      });
  };

	return (
		<StyledPage>
			<h1>Swatter</h1>
			<h2>Project Management</h2>
			{
				isLoading ? <LoginLoader />
				:  <form className="form-wrapper">
          <h2 id="create-heading">Create an Account</h2>
					<label>Username
						<input type="text" onChange={(event) => { setUsername(event.target.value); }} />
					</label>
          <label>Email
						<input type="email" onChange={(event) => { setEmail(event.target.value); }} />
					</label>
          <label>Confirm Email
						<input type="email" onChange={(event) => { setConfirmEmail(event.target.value); }} />
					</label>
					<label>Password
						<input type="password" onChange={(event) => { setPassword(event.target.value); }} />
					</label>
          <label>Confirm Password
						<input type="password" onChange={(event) => { setConfirmPassword(event.target.value); }} />
					</label>
					<StyledButton id="submit-button" type="submit" onClick={() =>{ handleSignup(); }}>Sign Up</StyledButton>
				</form>
			}
        <div className="login-container">
          <p>Already have an account?</p>
          <Link to={'/login'}>Log in</Link>
        </div>
		</StyledPage>
	)
}

const StyledPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: white;
	min-height: 80vh;
	border-radius: 4px;
	width: 90%;
	max-width: 1000px;
	margin: 20px auto;
	h1 {
    margin-top: 20px;
		font-size: 5em;
		color: #0f4d92;
    line-height: .9;
	}
	h2 {
		font-size: 1em;
		color: #0f4c92;
		text-align: center;
	}
	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px 0;
    h2 {
      margin: 10px auto;
    }
		label {
			font-weight: bold;
			font-size: ${palette.labelSize};
			display: flex;
			flex-direction: column;
		}
		input {
			width: 300px;
			height: 40px;
			margin-bottom: 20px;
			font-size: 1em;
		}
		#submit-button {
			color: #ffffff;
			background: #0f4d92;
			width: 200px;
			height: 40px;
			font-size: ${palette.subtitleSize};
			&:hover{
				color: #ffffff;
				cursor: pointer;
				background: #000000;
				transition: 0.2s;
			}
		}
	}
	.login-container {
    margin: 10px 0 20px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		p {
			font-size: 1em;
			color: #636363;
		}
		a {
			font-size: 1em;
			margin-left: 4px;
      text-decoration: underline;
      text-underline-position: under;
		}
	}
`;