// styled
import styled from 'styled-components';

// redux
import { connect } from 'react-redux';

const ProfilePage =({ user }) => {

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            {
                user.role === undefined
                ? <h1>You are signed out</h1>
                : 
                    <>
                        <div className="user-container">
                            <h2><span>Username: </span>{user.username}</h2>
                            {
                                user.role === process.env.REACT_APP_ADMIN_SECRET 
                                ? <h2><span>Role: </span>Admin</h2>
                                : user.role === process.env.REACT_APP_USER_SECRET 
                                ? <h2><span>Role: </span>User</h2>
                                : user.role === process.env.REACT_APP_GUEST_SECRET 
                                ? <h2><span>Role: </span>Guest</h2>
                                : <span>{user.role}</span>
                                
                            }
                        </div>
                    </>
            }
        </StyledProfilePage>
    )
}

const StyledProfilePage = styled.div`
    min-height: 60vh;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 50px auto;
    @media (max-width: 700px){
        margin: 20px auto;
    }
    h1 {
		font-size: 3em;
		color: #ffffff;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 50%;
        border-bottom: 2px #ffffff solid;
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
            color: white;
            @media (max-width: 1150px){
                margin: 10px 0;
                font-size: 2em;
            }
            span {
                color: #e2e2e2;
            }
        }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePage);