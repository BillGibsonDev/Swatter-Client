import { useState } from 'react';
import axios from 'axios';
// styled
import styled from 'styled-components';

export default function ProfilePage({user, role, confirmRole}) {

    const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
    const [ newpassword, setNewpassword ] = useState("");
	const [ confirm, setConfirm ] = useState("");

    function updateUser() {
        setUsername(user)
        if (newpassword !== confirm ) {
            alert("New password does not match retype password!");
        } else {
            axios.post(`${process.env.REACT_APP_UPDATE_USER_URL}`, {
                username: username,
                password: password,
                newpassword: newpassword,
        })
            .then(function(response) {
                if(response.data !== "User Updated"){
                    alert("Server Error - User not updated")
                } else {
                    alert('User Created!');
                }
            })
        }
    }

    console.log(updateUser) // remove error for production :)

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledProfilePage>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) : (
                    <>
                        <div className="user-container">
                            <h2>Username: {user} </h2>
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
                        <div className="update-container">
                            <h2>Update Password</h2>
                            <div className="form-wrapper">
                                <label>Current Password:</label>
                                <input 
                                    type="text" 
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                />
                                <label>New Password:</label>
                                <input 
                                    type="text" 
                                    onChange={(event) => {
                                        setNewpassword(event.target.value);
                                    }}
                                />
                                <label>Retype New Password:</label>
                                <input 
                                    type="text" 
                                    onChange={(event) => {
                                        setConfirm(event.target.value);
                                    }}
                                />
                                {
                                    role === process.env.REACT_APP_USER_SECRET || role === process.env.REACT_APP_ADMIN_SECRET ? (
                                        <button type="submit" onClick={()=>{confirmRole(role); updateUser();}}>Update Password</button>
                                    ) : (    
                                        <button onClick={unauthorized}>Update Password</button>
                                    )
                                }
				            </div>
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
justify-content: center;
    .user-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 60%;
    }
    .update-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: white;
        width: 90%;
        margin: 5% auto;
        border-radius: 12px;
        h2 {
            font-size: 2em;
            margin: 20px 0;
        }
        .form-wrapper {
            display: flex;
            width: 50%;
            flex-direction: column;
            align-items: center;
            label {
                font-weight: bold;
            }
            input {
                width: 200px;
                margin-bottom: 20px;
            }
            button {
                width: 200px;
                font-weight: bold;
                font-size: 1.2em;
                letter-spacing: 1px;
                cursor: pointer;
            }
        }
    }
`;