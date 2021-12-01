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
            role: role,
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
                    <Link to={`/`}>Back to Home Page</Link>
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
                }
            }
        .button-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2%;
            button {
                width: 100px;
                cursor: pointer;
            }
        }
    }
`;