import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// components
import { StyledButton } from '../../../styled/StyledButton.js';

export const UpdateEmail =({ userData, user,  editEmail, setEditingEmail }) => {

    const [ password, setPassword ] = useState('');
    const [ newEmail, setNewEmail ] = useState('');
    const [ confirmEmail, setConfirmEmail ] = useState('');

    const handleEmailUpdate = () => {
        if(!password){ return; };
        if(!newEmail){ return; };
        if(newEmail !== confirmEmail){ return; };
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/:${user.id}/update/email`, {
            username: user.username,
            password,
            newEmail
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
    }
    
    return (
        <StyledSection>
            <h1>Update Email</h1>
            <label>Email
                <input type="text" value={userData.email} disabled={true} />
            </label>
            <label>New Email
                <input type="text" onChange={(event) => { setNewEmail(event.target.value); }} />
            </label>
            <label>Confirm New Email
                <input type="text" onChange={(event) => { setConfirmEmail(event.target.value); }} />
            </label>
            <label>Password
                <input type="password" onChange={(event) => { setPassword(event.target.value); }} />
            </label>
            <div className="button-container">
                <StyledButton type="submit" onClick={() =>{ handleEmailUpdate(); }}>Update Email</StyledButton>
                <StyledButton id="cancel-button" onClick={() =>{ setEditingEmail(!editEmail); }}>Cancel</StyledButton>
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
        #cancel-button {
            background: #373737;
        }
    }
`;