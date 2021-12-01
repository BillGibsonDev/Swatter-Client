import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Logo from '../images/bugMicroYaleBlue.png';

export default function TopNav({logout, isLoggedIn, user, role}) {

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
                            <Link to="/LoginPage" onClick={logout}>Sign Out</Link>
                        </div>       
                    )
                }
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
    .logo-wrapper {
        display: flex;
        align-items: center;
        width: 33%;
        h1 {
            font-size: 3em;
            color: #0f4d92;
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
        width: 60%;
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
        a {
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
        }
    }
`;
