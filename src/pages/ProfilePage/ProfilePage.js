import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../../styled/ThemeVariables.js';

// components
import BreadCrumbs from '../../components/Breadcrumbs.js';

// sections
import { UpdateEmail } from './sections/UpdateEmail.js';
import { UpdatePassword } from './sections/UpdatePassword.js';
import { ProfileDetails } from './sections/ProfileDetails.js';

// redux
import { connect } from 'react-redux';

const ProfilePage =({ user, logout }) => {

    if (!user){ logout(); };

    const [ userData, setUserData ] = useState({});
    const [ editPassword, setEditingPassword ] = useState(false);
    const [ editEmail, setEditingEmail ] = useState(false);

    useEffect(() => {
      const fetchUser = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/profile`, {
            headers: {
                Authorization: user.token
            }
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) =>{
            console.log(error);
        })
      }
      fetchUser();
    }, [ user ])
    
    return (
        <StyledProfilePage>
            <BreadCrumbs projectTitle={'Profile'} />
            <h1>Profile</h1>
            {
                editEmail ? 
                    <UpdateEmail 
                        setEditingEmail={setEditingEmail}
                        editEmail={editEmail}
                        user={user} 
                        userData={userData}
                    />
                : editPassword ? 
                    <UpdatePassword
                        setEditingPassword={setEditingPassword}
                        editPassword={editPassword}
                        user={user} 
                    />
                : <ProfileDetails
                    setEditingEmail={setEditingEmail}
                    setEditingPassword={setEditingPassword}
                    editEmail={editEmail}
                    editPassword={editPassword}
                    userData={userData}
                    logout={logout}
                />
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.section`
    min-height: 60vh;
    width: 80%;
    max-width: 1000px;
    margin: 10px auto;
    h1 {
		font-size: ${palette.titleSize};
		color: #ffffff;
        margin: 10px 0;
        width: 50%;
        border-bottom: 2px #ffffff solid;
    }
    .user-container {
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
    }
    .options-container {
        button {
            margin: 20px 0;
        }
        #edit-email-button {

        }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);