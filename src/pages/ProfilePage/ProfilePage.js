import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../../styled/ThemeVariables.js';

// components
import BreadCrumbs from '../../components/Breadcrumbs.js';
import { DeleteAlert } from '../../components/DeleteAlert.js';

// sections
import { UpdateEmail } from './sections/UpdateEmail.js';
import { UpdatePassword } from './sections/UpdatePassword.js';
import { ProfileDetails } from './sections/ProfileDetails.js';

// functions
import { handleDeleteAlert } from '../../functions/handleDeleteAlert.js';

// redux
import { connect } from 'react-redux';

// router
import { useNavigate } from 'react-router-dom';
import { DeleteAccount } from './sections/DeleteAccount.js';
import { UpdateAvatar } from './sections/UpdateAvatar.js';

const ProfilePage =({ user }) => {

    const DeleteAlertRef = useRef();
    const navigate = useNavigate();
    
    const [ userData, setUserData ] = useState({});
    const [ editPassword, setEditingPassword ] = useState(false);
    const [ editEmail, setEditingEmail ] = useState(false);
    const [ deleteAccount, setDeleteAccount ] = useState(false);
    const [ editAvatar, setEditingAvatar ] = useState(false);

    const [ password, setPassword ] = useState('');
    const [ username, setUsername ] = useState('');

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
    
    const handleDeleteAccount = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/delete-account`,
        {
            username: username,
            password: password,
        }, 
        {
            headers: {
                Authorization: user.token
            }
        })
        .then((response) => {
            console.log(response.data);
            localStorage.clear();
            navigate('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <StyledProfilePage>
            <DeleteAlert
                handleDeleteAlert={handleDeleteAlert}
                DeleteAlertRef={DeleteAlertRef}
                deleteFunction={handleDeleteAccount}
                title={'account'}
            />
            <BreadCrumbs projectTitle={'Profile'} />
            {
                deleteAccount ? 
                    <DeleteAccount 
                        setUsername={setUsername}
                        setPassword={setPassword}
                        handleDeleteAlert={handleDeleteAlert}
                        DeleteAlertRef={DeleteAlertRef}
                        setDeleteAccount={setDeleteAccount}
                    />
                : editEmail ? 
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
                : editAvatar ? 
                    <UpdateAvatar
                        setEditingAvatar={setEditingAvatar}
                        editAvatar={editAvatar}
                        user={user} 
                        userData={userData}
                    />
                : <ProfileDetails
                    setEditingEmail={setEditingEmail}
                    setEditingPassword={setEditingPassword}
                    editEmail={editEmail}
                    editPassword={editPassword}
                    setEditingAvatar={setEditingAvatar}
                    editAvatar={editAvatar}
                    userData={userData}
                    deleteAcount={deleteAccount}
                    setDeleteAccount={setDeleteAccount}
                />
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.section`
    min-height: 60vh;
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
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
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);