
// styled
import styled from "styled-components";

// images
import Home from '../images/homeYaleBlue.png';
import Hamburger from '../images/hamburgerYaleBlue.png';
import Cog from '../images/cog.png';
import Profile from '../images/profileYaleBlue.png';
import Register from '../images/registerYaleBlue.png';

// router
import { Link } from 'react-router-dom';


export default function Nav({role, confirmAdmin}) {

function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

    return (
        <StyledNav>
            <nav>
                <div className="top-wrapper">
                    <Link to="/"><img src={Home} alt="" /><span>Home</span></Link>
                    <Link to="/SettingsPage"><img src={Cog} alt="" /><span>Settings</span></Link>
                    <Link to="/ProfilePage"><img src={Profile} alt="" /><span>Profile</span></Link>
                    {
                        role === process.env.REACT_APP_ADMIN_SECRET ? (
                            <Link onClick={confirmAdmin} to="/RegisterUserPage"><img src={Register} alt="" /><span>Register</span></Link>
                        ) : (
                            <></>     
                        )
                    }
                </div>
            </nav>
            <div id="myNav" className="overlay">
                <button onClick={closeNav}>&times;</button>
                <div className="overlayContent" onClick={closeNav}>
                    <Link to="/"><img src={Home} alt="" /><span>Home</span></Link>
                    <Link to="/SettingsPage"><img src={Cog} alt="" /><span>Settings</span></Link>
                    <Link to="/ProfilePage"><img src={Profile} alt="" /><span>Profile</span></Link>
                    {
                        role === process.env.REACT_APP_ADMIN_SECRET ? (
                            <Link onClick={confirmAdmin} to="/RegisterUserPage"><img src={Register} alt="" /><span>Register</span></Link>
                        ) : (
                            <></>     
                        )
                    }
                </div>
            </div>
            <img id='hamburger' src={Hamburger} onClick={openNav} alt="hamburger menu"/>
        </StyledNav>
    )
}

const StyledNav = styled.div`
display: flex;
flex-direction: column;
position: fixed;
left: 10%;
top: 20%;
z-index: 99;
    @media (max-width: 1650px){
        left: 8%;
    }
    @media (max-width: 1550px){
        left: 5%;
    }
    @media (max-width: 1450px){
        left: 3%;
    }
    @media (max-width: 1250px){
        left: 8%;
    }
    @media (max-width: 750px){
        top: 0;
        left: 2%;
        width: 100%;
        height: 10vh;
    }
    nav {
        display: flex;
        flex-direction: column;
        width: 40%;
        height: 70vh;
        justify-content: space-between;
        a {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            img {
                padding: 6px;
                border-radius: 12px;
                width: 40px;
                background: white;
                &:hover + span{
                    display: block;
                }
            }
            span {
                background: white;
                margin-left: 10px;
                color: #0f4d92;
                display: none;
                font-weight: bold;
                font-size: 1.2em;
                border-radius: 6px;
                padding: 0 10px;
                border: 2px solid #0f4d92;
            }
        }
            @media (max-width: 750px){
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
                    top: 25%; 
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
                position: absolute;
                top: 15%;
                right: 3%;
                &:hover, &:focus {
                    transition: 0.3s;
                    transform: rotateZ(30deg);
                }
                @media (max-width: 750px){
                    display: block;
                }
            }
`;