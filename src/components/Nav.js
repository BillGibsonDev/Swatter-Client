import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// components
import NavOverlay from './NavOverlay';

// images
import Logo from '../assets/images/bugMicroYaleBlue.png';
import Hamburger from '../assets/images/hamburgerYaleBlue.png';

export default function Nav({logout, user, role, confirmAdmin}) {

function openNav() {
    document.getElementById("myNav").style.width = "100%";
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
                    <div className="text-wrapper">
                        <div className="text-container">
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
    height: 6vh;
    width: 100%;
    margin: auto;
    padding: 0 5%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    background: #f1f1f1;
    z-index: 1000;
    position: relative;
    @media (max-width: 750px){
        grid-template-columns: 25% 50% 25%;
    }
    .logo-wrapper {
        display: flex;
        align-items: center;
        h1 {
            font-size: 30px;
            color: #0f4d92;
            @media (max-width: 750px){
                display: none;
            }
        }
        img {
            width: 40px;
            height: 40px;
        }
    }
    .text-wrapper {
        display: flex;
        align-items: center;
        margin: auto;
        .text-container{
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
        margin-left: auto;
        @media (max-width: 1050px){
            display: none;
        }
        .dropbtn {
            background-color: #0f4d92;
            color: white;
            padding: 10px 16px;
            font-size: 16px;
            border: none;
            cursor: pointer;
            &:hover {
                background: black;
            }
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
                &:hover {
                    text-decoration: underline;
                    text-underline-position: under;
                    background: #dbdbdb;
                }
            }
        }
    }

    .dropdown:hover .dropdown-content {
        display: block;
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
