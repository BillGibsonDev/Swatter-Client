import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

export default function ProjectPage({user, role, confirmRole}) {



    const [ projectTitle, setProjectTitle] = useState("");
    const [ startDate, setStartDate] = useState("");
    const [ author, setAuthor ] = useState(user);

    function makeDate(){
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        setStartDate(date);
    }

    useEffect(() => {
        makeDate();
        setAuthor(user);
    }, [user]);

    function addProject() {
        confirmRole(role);
        axios.post(`${process.env.REACT_APP_ADD_PROJECT_URL}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
        })
        .then(function(response) {
            if(response.data !== "Project Created"){
                alert("Server Error - Project not created")
            } else {
                alert('Project Started!');
            }
        })
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledProjectPage>
            <h1>Just add the Title and adjust the Correct Start Date (if nessecary)..</h1>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) : (    
                <div className="form-wrapper">
                    <label>Title
                        <input 
                            type="text"
                            id="title"
                            onChange={(event) => {
                                setProjectTitle(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Date
                        <input 
                            type="text" 
                            id="date"
                            defaultValue={startDate}
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }} 
                        />
                    </label>
                    <div className="button-container">
                    {
                        role === process.env.REACT_APP_GUEST_SECRET ? (
                            <button onClick={unauthorized}>Save</button>
                        ) : (    
                            <button onClick={addProject}>Save</button>
                        )
                    }
                    <Link to={`/`}>Go Back</Link>
                    </div>
                </div>
            )}
        </StyledProjectPage>
    ) 
}

const StyledProjectPage = styled.div`
display: flex;
flex-direction: column;
width: 90%;
background: #fff;
border-radius: 12px;
margin: auto;
    @media (max-width: 750px){
        width: 98%;
        height: 40vh;
    }
    h1 {
        width: 95%;
        margin: 2% auto;
        font-size: 1.2em;
    }
    .form-wrapper {
        width: 95%;
        margin: 2% auto;
        label {
            display: flex;
            flex-direction: column;
            margin: 10px 0;
                input, select {
                    width: 50%;
                    @media (max-width: 750px){
                        width: 90%;
                    }
                }
            }
        .button-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2%;
            @media (max-width: 750px){
                margin-top: 10%;
            }
            button, a {
                width: 100px;
                cursor: pointer;
                border: none;
                border-radius: 4px;
                font-size: 1.2em;
                font-weight: 700;
                background: lightgray;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #0f4d92;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
            a {
                color: #ffffff;
                padding: 0 6px;
                border-radius: 4px;
                background: #0f4d92;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    color: #000000;
                    cursor: pointer;
                    background: lightgray;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
        }
    }
`;