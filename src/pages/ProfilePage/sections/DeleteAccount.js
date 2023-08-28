// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// components
import { StyledButton } from '../../../styled/StyledButton.js';

export const DeleteAccount =({ 
    handleDeleteAlert, 
    DeleteAlertRef, 
    setDeleteAccount,
    setPassword,
    setUsername
}) => {
    
    return (
        <StyledSection>
            <h1>Delete Account</h1>
            <label>Username
                <input type="text" onChange={(event) => { setUsername(event.target.value); }}/>
            </label>
            <label>Password
                <input type="password" onChange={(event) => { setPassword(event.target.value); }} />
            </label>
            <div className="button-container">
                <StyledButton id="delete-account-button" type="submit" onClick={() =>{ handleDeleteAlert(DeleteAlertRef); }}>Delete Account</StyledButton>
                <StyledButton id="cancel-button" onClick={() =>{ setDeleteAccount(false); }}>Cancel</StyledButton>
            </div>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        font-size: ${palette.labelSize};
        display: flex;
        flex-direction: column;
        color: white;
    }
    input {
        width: 300px;
        height: 30px;
        margin-bottom: 20px;
        font-size: 1em;
        padding: 2px;
    }
    .button-container {
        button {
            margin: 20px 0;
        }
        #delete-account-button {
            background: red;
        }
        #cancel-button {
            background: #373737;
        }
    }
`;