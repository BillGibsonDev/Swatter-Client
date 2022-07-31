// images
import BugImage from '../assets/icons/bugYaleBlue.png'

// styled
import styled from 'styled-components';
import { StyledButton } from '../styled/StyledButton';
import * as pallette from '../styled/ThemeVariables';

export default function LoginPage({login, setUsername, setPassword, handleTokens, isLoading }) {

	return (
		<StyledLoginPage>
			<h1>Swatter</h1>
			<h2>Project Management</h2>
			{
				isLoading 
				? 
					<div className="loading-container">
						<div className="loader">
							<img src={BugImage} alt="" />
						</div>
							<h2>Signing In...</h2>
					</div>
				: 
					<form className="form-wrapper">
						<label>Username</label>
						<input 
							type="text" 
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>
						<label>Password</label>
						<input 
							type="password" 
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<StyledButton id="submit-button" type="submit" onClick={() =>{ login(); handleTokens(); }}>Sign In</StyledButton>
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
	h1 {
		font-size: 5em;
		color: #0f4d92;
	}
	h2 {
		font-size: 1em;
		margin-bottom: 40px;
		color: #0f4c92bc;
		text-align: center;
	}
	h3 {
		font-size: 2em;
		margin-bottom: 50px;
	}
	.loading-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		position: relative;
		.loader {
			opacity: 80%;
			border: 16px dashed #000000;
			border-radius: 50%;
			width: 180px;
			height: 180px;
			animation: spin 2s linear infinite;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 100px;
			}
		}
		h2 {
			margin-top: 10px;
			font-size: 1em;
			color: black;
		}
	}
 	@keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
			font-size: ${pallette.subtitleSize};
		}
		input {
			width: 300px;
			height: 40px;
			margin-bottom: 20px;
			font-size: 18px;
		}
		#submit-button {
			color: #ffffff;
			background: #0f4d92;
			width: 200px;
			height: 40px;
			font-size: ${pallette.subtitleSize};
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
			font-size: ${pallette.paraSize};
			color: #636363;
		}
		h5 {
			color: #636363;
			font-size: ${pallette.paraSize};
		}
	}
`;