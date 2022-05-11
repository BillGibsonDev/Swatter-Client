import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

export default function NavOverlay({logout, role, confirmAdmin}) {

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

    return (
        <StyledOverlay id="myNav">
            <button onClick={closeNav}>&times;</button>
            <div className="overlay-content" onClick={closeNav}>
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
        </StyledOverlay>
    )
}

const StyledOverlay = styled.div`
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
        color: white;
        background: transparent;
        border: none;
        cursor: pointer;
        &:hover, &:focus {
            transition: 0.2s;
            transform: scale(1.05);
            color: ${pallette.accentColor};
        }
    }
    .overlay-content {
        position: relative;
        top: 15%; 
        width: 70%;
        margin: auto;
        margin-top: 30px;
        z-index: 99;
        a {
            display: flex;
            justify-content: center;
            font-size: 30px;
            color: ${pallette.accentColor};
            margin: 40px 0;
            transition: 0.2s; 
                &:hover, &:focus {
                color: #f1f1f1;
                transition: 0.3s;
                transform: scale(1.1);
            }
        }
    } 
`;