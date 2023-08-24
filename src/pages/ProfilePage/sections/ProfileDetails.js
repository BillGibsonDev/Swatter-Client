// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// components
import { StyledButton } from '../../../styled/StyledButton.js';

// functions
import { handleDate } from '../../../functions/handleDates.js';

export const ProfileDetails =({ 
    userData,
    logout, 
    setEditingEmail, 
    setEditingPassword,
    editEmail,
    editPassword
}) => {
    
    return (
        <StyledSection>
            <div className="field-container">
                <h2><span>Username: </span>{userData.username}</h2>
            </div>
            <div className="field-container">
                <h2><span>Email: </span>{userData.email}</h2>
            </div>
            <div className="field-container">
                <h2><span>Account Created: </span>{handleDate(userData.created)}</h2>
            </div>
            <div className="field-container">
                <h2><span>Last Login: </span>{handleDate(userData.lastLogin)}</h2>
            </div>
        <div className="options-container">
            <StyledButton id="edit-email-button" onClick={() => setEditingEmail(!editEmail)}>Update Email</StyledButton>
            <StyledButton id="edit-password-button" onClick={() => setEditingPassword(!editPassword)}>Update Password</StyledButton>
            <StyledButton id="signout-button" onClick={logout}>Sign Out</StyledButton>
        </div>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    h2 {
        color: white;
        font-size: 1em;
        span {
            color: ${palette.helperGrey};
        }
    }
    .field-container {
        display: flex;
        align-items: center;
        margin: 10px 0 0 0;
        width: 100%;
        button {
            background: none;
            border: none;
            width: 26px;
            height: 26px;
            display: flex;
            padding: 1px;
            margin-left: 6px;
            cursor: pointer;
            img {
                width: 100%;
            }
            &:hover {
                background: ${palette.accentColor};
                transition: 0.2s;
            }
        }
    }
    .options-container {
        button {
            margin: 20px 0;
        }
        #edit-email-button {

        }
    }
`;