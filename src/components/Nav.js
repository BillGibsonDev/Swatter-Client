
// styled
import styled from "styled-components";

// images
import Home from '../images/homeYaleBlue.png';
import Profile from '../images/profileYaleBlue.png';
import Register from '../images/registerYaleBlue.png';

// router
import { Link } from 'react-router-dom';


export default function Nav({role, confirmAdmin}) {

    return (
        <StyledNav>
            <nav>
                <div className="top-wrapper">
                    <Link to="/"><img src={Home} alt="" /><span>Home</span></Link>
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
        left: 2%;
    }
    @media (max-width: 1450px){
        left: 1%;
    }
    @media (max-width: 1050px){
        display: none;
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
                border-radius: 4px;
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
                border-radius: 4px;
                padding: 0 10px;
                border: 2px solid #0f4d92;
            }
        }
    }
`;