// styled
import styled from 'styled-components';
import { StyledButton } from '../styled/StyledButton';
import * as palette from '../styled/ThemeVariables';

// loaders
import LoginLoader from '../loaders/LoginLoader';

export default function LoginPage({login, setUsername, setPassword, isLoading }) {

	return (
		<StyledLoginPage>
			<h1>Swatter</h1>
			<h2>Project Management</h2>
			{
				!isLoading ? <LoginLoader />
				:  <form className="form-wrapper">
					<label>Username
						<input type="text" onChange={(event) => { setUsername(event.target.value); }} />
					</label>
					<label>Password
						<input type="password" onChange={(event) => { setPassword(event.target.value); }} />
					</label>
					<StyledButton id="submit-button" type="submit" onClick={() =>{ login(); }}>Sign In</StyledButton>
				</form>
			}
			<div className="guest-container">
				<h4>For Guests - (View Only)</h4>
				<h5>Username: Guest</h5>
				<h5>Password: Guest</h5>
			</div>
		</StyledLoginPage>
	)
}

const StyledLoginPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background: white;
	min-height: 80vh;
	border-radius: 4px;
	width: 90%;
	max-width: 1000px;
	margin: 5% auto;
	@media (max-width: 750px){
		width: 95vh;
	}
	h1 {
		font-size: 5em;
		color: #0f4d92;
	}
	h2 {
		font-size: 1em;
		margin-bottom: 40px;
		color: #0f4c92;
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
	.guest-container {
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		h4 {
			font-size: ${palette.paraSize};
			color: #636363;
		}
		h5 {
			color: #636363;
			font-size: ${palette.paraSize};
		}
	}
`;