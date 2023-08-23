import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables.js';

// components
import { BreadCrumbs } from '../components/Breadcrumbs.js';

// redux
import { connect } from 'react-redux';
import { StyledButton } from '../styled/StyledButton.js';

// functions
import { handleDate } from '../functions/handleDates.js';

// icons
import * as icons from '../assets/IconImports.js';

const ProfilePage =({ user, logout }) => {

    if ( !user ){ logout(); };

    const [ userData, setUserData ] = useState({});

    useEffect(() => {
      const fetchUser = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/${user.id}/profile`, {
            headers: {
                Authorization: user.token
            }
        })
        .then((response) => {
            console.log(response.data);
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
            <div className="user-container">
                <div className="field-container">
                    <h2><span>Username: </span>{userData.username}</h2>
                    <button><img src={icons.Edit} alt="Edit" /></button>
                </div>
                <div className="field-container">
                    <h2><span>Email: </span>{userData.email}</h2>
                    <button><img src={icons.Edit} alt="Edit"  /></button>
                </div>
                <div className="field-container">
                    <h2><span>Account Created: </span>{handleDate(userData.created)}</h2>
                </div>
                <div className="field-container">
                    <h2><span>Last Login: </span>{handleDate(userData.lastLogin)}</h2>
                </div>
            </div>
            <div className="options-container">
                <StyledButton id="signout-button" onClick={logout}>Sign Out</StyledButton>
            </div>
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
        width: 60%;
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
        #signout-button {
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