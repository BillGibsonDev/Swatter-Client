
// styled
import styled from 'styled-components';

export default function ProfilePage({user, role}) {

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) : (
                    <>
                        <div className="user-container">
                            <h2><span>Username: </span>{user}</h2>
                            {
                                role === process.env.REACT_APP_ADMIN_SECRET ? (
                                    <h2><span>Role: </span>Admin</h2>
                                ) : role === process.env.REACT_APP_USER_SECRET ? (
                                    <h2><span>Role: </span>User</h2>
                                ) : role === process.env.REACT_APP_GUEST_SECRET ? (
                                    <h2><span>Role: </span>Guest</h2>
                                ) : (
                                    <span>{role}</span>
                                )
                            }
                        </div>
                    </>
                )
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.div`
background: #fff;
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: auto;
display: flex;
align-items: center;
flex-direction: column;
    @media (max-width: 1050px){
        width: 98%;
    }
    h1 {
		font-size: 3em;
		color: #0f4d92;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 50%;
        border-bottom: 2px #0f4d92 solid;
    }
    .user-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 60%;
        @media (max-width: 1150px){
            flex-direction: column;
        }
        h2 {
            margin: 20px 0;
            @media (max-width: 1150px){
                margin: 10px 0;
                font-size: 2em;
            }
            span {
                color: #363636;
            }
        }
    }
`;