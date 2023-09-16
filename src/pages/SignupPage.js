import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

// styled
import styled from 'styled-components';
import { StyledButton } from '../styled/StyledButton';
import * as palette from '../styled/ThemeVariables';

// router
import { Link, useNavigate } from 'react-router-dom';

// loaders
import LoginLoader from '../loaders/LoginLoader';

// redux
import { useDispatch } from 'react-redux';
import { showAlert } from '../redux/actions/alert';

export default function SignupPage({ isLoading, setLoading }) {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ confirmEmail, setConfirmEmail ] = useState("");

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required('Username is required')
			.min(3, 'Username must be at least 3 characters')
			.max(20, 'Username cannot exceed 20 characters'),
		email: Yup.string()
			.required('Email is required')
			.email('Invalid email format'),
		confirmEmail: Yup.string()
			.required('Please confirm your email')
			.oneOf([Yup.ref('email')], 'Emails must match'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: Yup.string()
			.required('Please confirm your password')
			.oneOf([Yup.ref('password')], 'Passwords must match'), 
	});

	const handleSignup = (event) => {
		event.preventDefault();
		validationSchema.validate({ username, email, confirmEmail, password, confirmPassword })
		.then(() => {
			setLoading(true);
			axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, {
				username: username,
				email: email,
				password: password,
			})
			.then((response) => {
				if (response.status === 200) {
					setLoading(false);
					dispatch(showAlert('', 'success'));
					navigate('/login');
				}
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				dispatch(showAlert(error, 'error'));
			});
		})
		.catch((validationError) => {
			dispatch(showAlert(validationError, 'error'));
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
					<StyledButton type="submit" onClick={(event) =>{ handleSignup(event); }}>Create Account</StyledButton>
				</form>
			}
			<div className="login-container">
				<p>Already have an account?</p>
				<Link to={'/login'}>Log in</Link>
			</div>
		</StyledPage>
	)
}

const StyledPage = styled.section`
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
		color: ${palette.accentColor};
    	line-height: .9;
	}
	h2 {
		font-size: 1em;
		color: ${palette.accentColor};
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