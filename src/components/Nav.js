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

export default function Nav({logout, role, confirmAdmin}) {

    return (
        <StyledNav>
            <div className="top-container">
                <Link to="/"><img src={Home} alt="Home" /><span className="tooltiptext">Home</span></Link>
                <Link to="/"><img src={Search} alt="Search" /><span className="tooltiptext">Search</span></Link>
                {
                    role === process.env.REACT_APP_ADMIN_SECRET 
                    ? <Link onClick={confirmAdmin} to="/RegisterUserPage"><img src={Register} alt="Register User" /><span className="tooltiptext">Register User</span></Link>
                    : <></>
                }
                <Link id="add-button" to={'/CreateProjectPage'}><img src={Add} alt="Create Project"/><span className="tooltiptext">Create Project</span></Link>
                <Link to="/"><img src={Help} alt="Help" /><span className="tooltiptext">Help</span></Link>
            </div>
            <div className="bottom-container">
                <Link to="/ProfilePage"><img src={Profile} alt="Profile" /><span className="tooltiptext">Profile</span></Link>
                <Link to="/LoginPage" onClick={logout}><img src={Logout} alt="Log Out" /><span className="tooltiptext">Log Out</span></Link>
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
    z-index: 1;
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
        margin-top: 8px;
        position: relative;
        a {
            margin-bottom: 30px;
            position: relative;
            .tooltiptext {
                visibility: hidden;
                width: 100%;
                min-width: 160px;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1000;
                top: 0;
                left: 105%;
            }
        }
        a:hover .tooltiptext, a:active .tooltiptext {
            visibility: visible;
            transition-delay: 1s;
        }
    }
    .bottom-container {
        display: flex;
        height: 20%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0;
        bottom: 0;
        position: relative;
        a {
            margin-bottom: 10px;
            position: relative;
            .tooltiptext {
                visibility: hidden;
                width: 100%;
                min-width: 160px;
                background-color: black;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 2000;
                top: 0;
                left: 105%;
            }
        }
        a:hover .tooltiptext, a:active .tooltiptext {
            visibility: visible;
            transition-delay: 1s;
            margin-bottom: 30px;
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
