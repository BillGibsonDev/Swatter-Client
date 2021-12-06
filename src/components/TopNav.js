import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Logo from '../images/bugMicroYaleBlue.png';
import Hamburger from '../images/hamburgerYaleBlue.png';

export default function TopNav({logout, user, role, confirmAdmin}) {

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

    return (
        <StyledTopNav>
            <div className="logo-wrapper">
                <img src={Logo} alt="" />
                <h1>Swatter</h1>
            </div>
                {
                    user === null ? (
                        <Link to="/LoginPage">Sign In</Link>
                    ) : (
                        <div className="link-container">
                            <div className="text-wrapper">
                                <h3>Signed in as:</h3>
                                <h2>{user} - {
                                        role === process.env.REACT_APP_ADMIN_SECRET ? (
                                            <span>Admin</span>
                                        ) : role === process.env.REACT_APP_USER_SECRET ? (
                                            <span>User</span>
                                        ) : role === process.env.REACT_APP_GUEST_SECRET ? (
                                            <span>Guest</span>
                                        ) : (
                                            <span>{role}</span>
                                        )
                                    }
                                </h2>
                            </div>
                        </div>       
                    )
                }
                <Link id="signOut" to="/LoginPage" onClick={logout}>Sign Out</Link>
                <div id="myNav" className="overlay">
                    <button onClick={closeNav}>&times;</button>
                    <div className="overlayContent" onClick={closeNav}>
                        <Link to="/">Home</Link>
                        <Link to={'/AddProjectPage'}>New Project</Link>
                        <Link to="/SettingsPage">Settings</Link>
                        <Link to="/ProfilePage">Profile</Link>
                        {
                            role === process.env.REACT_APP_ADMIN_SECRET ? (
                                <Link onClick={confirmAdmin} to="/RegisterUserPage">Register</Link>
                            ) : (
                                <></>     
                            )
                        }
                        <Link to="/LoginPage" onClick={logout}>Sign Out</Link>
                    </div>
                </div>
                <img id='hamburger' src={Hamburger} onClick={openNav} alt="hamburger menu"/>
        </StyledTopNav>
    )
}

const StyledTopNav = styled.div`
height: 10vh;
width: 90%;
padding: 0 5%;
margin: 2% auto 2px auto;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: space-between;
background: #f1f1f1;
z-index: 1000;
    @media (max-width: 750px){
        width: 98%;
    }
    .logo-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
            font-size: 3em;
            color: #0f4d92;
            @media (max-width: 750px){
                display: none;
            }
        }
        img {
            width: 50px;
            height: 50px;
        }
    }
    .link-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
            .text-wrapper{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h2 {
                    font-size: 16px;
                    color: #000000;
                }
                h3 {
                    font-size: 14px;
                    color: #383838;
                }
            }
    }
    #signOut {
        background: #ffffff;
        color: #0f4d92;;
        padding: 0 6px;
        border-radius: 4px;
        font-weight: bold;
        &:hover{
            color: #ffffff;
            cursor: pointer;
            background: #0f4d92;
            transition: 0.2s;
            transform: scale(1.01);
        }
        @media (max-width: 1050px){
                display: none;
        }
    }
    .overlay {
        height: 100%;
        width: 0;
        position: fixed; 
        left: 0;
        top: 0;
        background-color: rgb(0,0,0); 
        overflow-x: hidden; 
        transition: 0.5s;
        z-index: 99; 
            button {
                position: absolute;
                top: 20px;
                right: 45px;
                font-size: 60px;
                color: #818181;
                background: transparent;
                border: none;
                cursor: pointer;
                &:hover, &:focus {
                    transition: 0.3s;
                    transform: scale(1.1);
                }
            }
            .overlayContent {
                position: relative;
                top: 15%; 
                width: 50%;
                margin: auto;
                margin-top: 30px;
                z-index: 99;
                a {
                    display: flex;
                    justify-content: center;
                    font-size: 2em;
                    color: white;
                    margin: 2em 0;
                    transition: 0.3s; 
                        &:hover, &:focus {
                        color: #f1f1f1;
                        transition: 0.3s;
                        transform: scale(1.1);
                    }
                    img{
                        width: 30px;
                        margin-right: 10px;
                    }
                }
            } 
        }
        #hamburger {
            cursor: pointer;
            display: none;
            width: 30px;
            &:hover, &:focus {
                transition: 0.3s;
                transform: rotateZ(30deg);
            }
            @media (max-width: 1050px){
                display: block;
            }
        }
`;
