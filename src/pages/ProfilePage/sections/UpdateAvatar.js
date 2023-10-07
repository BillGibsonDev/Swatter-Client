import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables.js';

// components
import { StyledButton } from '../../../styled/StyledButton.js';

// functions
import { handleImages } from '../../../functions/handleImages.js';

export const UpdateAvatar =({ userData, user,  editAvatar, setEditingAvatar }) => {

    const [ avatar, setAvatar ] = useState('')

    const handleAvatarUpdate = async () => {
        if(!avatar){ return; };
        const avatarURL = await handleImages(avatar);
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/update/avatar`, {
            avatar: avatarURL
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
    }
    
    return (
        <StyledSection>
            <img src={userData.avatar} alt="Error loading avatar" />
            <label>
                <input type="file" onChange={(e) => { setAvatar(e.target.files[0])}} />
            </label>
            <div className="button-container">
                <StyledButton type="submit" onClick={() =>{ handleAvatarUpdate(); }}>Update Avatar</StyledButton>
                <StyledButton id="cancel-button" onClick={() =>{ setEditingAvatar(!editAvatar); }}>Cancel</StyledButton>
            </div>
        </StyledSection>
    )
}

const StyledSection = styled.section`
    img {
        max-width: 400px;
        border-radius: 50%;
    }
    label {
        font-weight: bold;
        font-size: ${palette.labelSize};
        display: flex;
        align-items: center;
        color: white;
    }
    input {
        color: black;
        width: 100%;
        max-width: 400px;
        margin: 20px 0;
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