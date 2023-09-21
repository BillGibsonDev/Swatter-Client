import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// components
import { StyledButton } from '../../../styled/StyledButton.js';

export const UpdatePassword =({ user, editPassword, setEditingPassword }) => {

    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handlePasswordUpdate = () => {
        if(!password){ return; };
        if(!newPassword){ return; };
        if(newPassword !== confirmPassword){ return; };
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/:${user.id}/update/password`, {
            username: user.username,
            password,
            newPassword
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
    }
    
    return (
        <StyledSection>
            <label>Password
                <input type="password" onChange={(event) => { setPassword(event.target.value); }} />
            </label>
            <label>New Password
                <input type="password" onChange={(event) => { setNewPassword(event.target.value); }} />
            </label>
            <label>Confirm New Password
                <input type="password" onChange={(event) => { setConfirmPassword(event.target.value); }} />
            </label>
            <div className="button-container">
                <StyledButton type="submit" onClick={() =>{ handlePasswordUpdate(); }}>Update Password</StyledButton>
                <StyledButton id="cancel-button" onClick={() =>{ setEditingPassword(!editPassword); }}>Cancel</StyledButton>
            </div>
        </StyledSection>
    )
}

const StyledSection = styled.section`
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
        #cancel-button {
            background: #373737;
        }
    }
`;