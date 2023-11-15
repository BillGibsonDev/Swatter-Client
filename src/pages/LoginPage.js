// styled
import styled from 'styled-components';
import { StyledButton } from '../styled/StyledButton';
import * as palette from '../styled/ThemeVariables';

// loaders
import LoginLoader from '../loaders/LoginLoader';

// router
import { Link } from 'react-router-dom';

export default function LoginPage({ handleLogin, setUsername, setPassword, isLoading, handleGuestLogin }) {

	return (
		<StyledPage>
			<h1>Swatter</h1>
			<h2>Project Management</h2>
			{
				isLoading ? <LoginLoader />
				:  
				<>
					<form className="form-wrapper">
						<label>Username
							<input type="text" onChange={(event) => { setUsername(event.target.value); }} />
						</label>
						<label>Password
							<input type="password" onChange={(event) => { setPassword(event.target.value); }} />
						</label>
						<StyledButton type="submit" onClick={(event) =>{ handleLogin(event); }}>Sign In</StyledButton>
					</form>
					<div className="signup-container">
						<p>Need an account?</p>
						<Link to={'/signup'}>Sign up</Link>
					</div>
					<StyledButton id="tour-button" onClick={() => { handleGuestLogin()}}>I'm Just Here For The Tour</StyledButton>
				</>
			}
		</StyledPage>
	)
}

const StyledPage = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: white;
	min-height: 90vh;
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
		margin-bottom: 40px;
		color: ${palette.accentColor};
		text-align: center;
	}
	.form-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 50px 0;
		@media (max-width: 750px){
			margin: 20px 0;
		}
		label {
			font-weight: bold;
			font-size: ${palette.labelSize};
			display: flex;
			flex-direction: column;
			text-align: center;
		}
		input {
			width: 300px;
			height: 40px;
			margin-bottom: 20px;
			font-size: 1em;
		}
	}
	.signup-container {
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
	#tour-button {
		background: grey;
	}
`;