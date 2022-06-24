import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// images
import Add from '../assets/icons/Add.png';
import Logout from '../assets/icons/logoutWhite.png';
import Help from '../assets/icons/help.png';
import Search from '../assets/icons/searchWhite.png';
import Profile from '../assets/icons/profileWhite.png';
import Home from '../assets/icons/homeWhite.png';
import Register from '../assets/icons/taskIcon.png';

export default function Nav({logout, user, role, confirmAdmin}) {

    return (
        <StyledNav>
            <div className="top-container">
                <Link to="/"><img src={Home} alt="Home" /></Link>
                <Link to="/"><img src={Search} alt="Search" /></Link>
                {
                    role === process.env.REACT_APP_ADMIN_SECRET 
                    ? <Link onClick={confirmAdmin} to="/RegisterUserPage"><img src={Register} alt="Register User" /></Link>
                    : <></>
                }
                <Link id="add-button" to={'/AddProjectPage'}><img src={Add} alt="Add Project"/></Link>
                <Link to="/"><img src={Help} alt="Help" /></Link>
            </div>
            <div className="bottom-container">
                <Link to="/ProfilePage"><img src={Profile} alt="Profile" /></Link>
                <Link to="/LoginPage" onClick={logout}><img src={Logout} alt="Log Out" /></Link>
            </div>
        </StyledNav>
    )
}

const StyledNav = styled.div`
    height: 100vh;
    width: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #000000;
    z-index: 5;
    position: fixed;
    left: 0;
    top: 0;
    @media (max-width: 450px){
        width: 50px;
    }
    .top-container {
        display: flex;
        height: 88%;
        flex-direction: column;
        align-items: center;
        margin-top: 16px;
        position: relative;
        a {
            margin-bottom: 30px;
        }
    }
    .bottom-container {
        display: flex;
        height: 12%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0;
        bottom: 0;
        position: relative;

        a {
            margin-bottom: 10px;
        }
    }
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 6px;
        &:hover {
            background: ${pallette.accentColor};
        }
    }
    img {
        width: 30px;
        height: 30px;
    }
`;
