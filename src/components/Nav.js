import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Logo from '../images/bugMicroYaleBlue.png';
import Hamburger from '../images/hamburgerYaleBlue.png';

export default function Nav({logout, user, role, confirmAdmin}) {

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

    return (
        <StyledNav>
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
                <div className="dropdown">
                    <button className="dropbtn">Menu</button>
                    <div className="dropdown-content">
                        <Link to="/">Home</Link>
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
                <div id="myNav" className="overlay">
                    <button onClick={closeNav}>&times;</button>
                    <div className="overlayContent" onClick={closeNav}>
                        <Link to="/">Home</Link>
                        <Link to={'/AddProjectPage'}>New Project</Link>
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
        </StyledNav>
    )
}

const StyledNav = styled.div`
    height: 6vh;
    width: 100vw;
    padding: 0 5%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f1f1f1;
    z-index: 1000;
    position: relative;
    top: 0;
    left: 0;
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

    .dropdown {
        position: relative;
        display: inline-block;
        @media (max-width: 750px){
            display: none;
        }
    .dropbtn {
        background-color: #0f4d92;
        color: white;
        padding: 16px;
        font-size: 16px;
        border: none;
        }
        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f1f1f1;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
            a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }
        }
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown:hover .dropbtn {
        background-color: #a5a5a5;
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
                color: #3a63d1;
                background: transparent;
                border: none;
                cursor: pointer;
                &:hover, &:focus {
                    transition: 0.3s;
                    transform: scale(1.1);
                    color: #ffffff;
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
                    color: #3a63d1;
                    margin: 2em 0;
                    transition: 0.3s; 
                        &:hover, &:focus {
                        color: #f1f1f1;
                        transition: 0.3s;
                        transform: scale(1.1);
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
