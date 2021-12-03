// images
import BugImage from '../images/bugYaleBlue.png'

// styled
import styled from 'styled-components';

export default function LoginPage({login, setUsername, setPassword, handleTokens, isLoading }) {

	return (
		<StyledLoginPage>
			<h1>Swatter</h1>
			<h2>Bug Tracking and Workflow Organization</h2>
			<h3>Sign In</h3>
			{
				isLoading === true ? (
					<div className="loading-container">
						<div className="loader">
							<img src={BugImage} alt="" /></div>
					</div>
				) : (
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
							type="password" 
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<button type="submit" onClick={() =>{ login(); handleTokens(); }}>Sign In</button>
					</div>
				)
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
height: 80vh;
width: 90%;
margin: 5% auto;
border-radius: 12px;
	h1 {
		font-size: 5em;
		color: #0f4d92;
	}
	h2 {
		font-size: 1.5em;
		margin-bottom: 40px;
		color: #0f4c92bc;
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
			border: 16px solid #f3f3f3;
			border: 16px dashed #0f4d92;
			border-radius: 50%;
			width: 150px;
			height: 150px;
			animation: spin 2s linear infinite;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 100px;
			}
		}
	}
 	@keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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
			width: 120px;
			font-weight: bold;
			font-size: 1.2em;
			letter-spacing: 1px;
			cursor: pointer;
		}
	}
	.guest-container {
		margin-top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		h4 {
			font-size: 1.2em;
			color: #636363;
		}
		h5 {
			color: #636363;
			font-size: 1em;
		}
	}
`;