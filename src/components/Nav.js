import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// components
import NavOverlay from './NavOverlay';

// images
import Hamburger from '../assets/images/hamburgerYaleBlue.png';
import Add from '../assets/icons/Add.png';
import Logout from '../assets/icons/logoutWhite.png';
import Help from '../assets/icons/help.png';
import Search from '../assets/icons/searchWhite.png';
import Profile from '../assets/icons/profileWhite.png';
import Home from '../assets/icons/homeWhite.png';
import Register from '../assets/icons/taskIcon.png';

export default function Nav({logout, user, role, confirmAdmin}) {

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

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
            <NavOverlay
                role={role}
                logout={logout}
                confirmAdmin={confirmAdmin}
            />
            <img id='hamburger' src={Hamburger} onClick={openNav} alt="hamburger menu"/>
        </StyledNav>
    )
}

const StyledNav = styled.div`
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #000000;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    .top-container {
        display: flex;
        height: 60%;
        flex-direction: column;
        align-items: center;
        margin-top: 16px;
        margin-bottom: auto;
        position: relative;
        a {
            margin-bottom: 20px;
        }
    }
    .bottom-container {
        display: flex;
        height: 15%;
        flex-direction: column;
        align-items: center;
        margin-top: auto;
        margin-bottom: 0;
        position: relative;
        a {
            margin-bottom: 20px;
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

    #hamburger {
        cursor: pointer;
        display: none;
        width: 30px;
        margin-left: auto;
        &:hover, &:focus {
            transition: 0.2s;
            transform: rotateZ(10deg);
        }
        @media (max-width: 1050px){
            display: block;
        }
    }
`;
