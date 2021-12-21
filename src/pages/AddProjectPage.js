import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';

export default function AddProjectPage({user, role, confirmRole}) {

    const [ projectTitle, setProjectTitle] = useState("");
    const [ startDate, setStartDate] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ projectLink, setProjectLink ] = useState("");
    const [ projectImage, setProjectImage ] = useState("");
    const [ isLoading, setLoading ] = useState(false);

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
        setLoading(true);
        axios.post(`${process.env.REACT_APP_ADD_PROJECT_URL}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
            projectLink: projectLink,
            projectImage: projectImage,
        })
        .then(function(response) {
            if(response.data !== "Project Created"){
                setLoading(false);
                alert("Server Error - Project not created")
            } else {
                setLoading(false);
                alert('Project Started!');
            }
        })
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledProjectPage>
            <h1>Start a Project</h1>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) :isLoading === true ? (    
                    <Loader/>
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
                    <label>Link
                        <input 
                            type="text"
                            id="projectLink"
                            onChange={(event) => {
                                setProjectLink(event.target.value);
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
                    <label>Image
                        <input 
                            type="text" 
                            id="image"
                            onChange={(event) => {
                                setProjectImage(event.target.value);
                            }} 
                        />
                    </label>
                    <div className="button-container">
                    {
                        role === process.env.REACT_APP_GUEST_SECRET ? (
                            <button onClick={unauthorized}>Start</button>
                        ) : (    
                            <button onClick={addProject}>Start</button>
                        )
                    }
                    <Link id="back-button" to={`/`}>Back</Link>
                    </div>
                </div>
            )}
        </StyledProjectPage>
    ) 
}

const StyledProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    @media (max-width: 750px){
        height: 40vh;
    }
    h1 {
        color: white;
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
            color: white;
                input, select {
                    width: 50%;
                    padding: 2px;
                    @media (max-width: 750px){
                        width: 90%;
                    }
                }
            }
        .button-container{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 50%;
            @media (max-width: 750px){
                margin-top: 10%;
                width: 90%;
            }
            button, a {
                width: 100px;
                cursor: pointer;
                border: none;
                border-radius: 4px;
                font-size: 1.2em;
                font-weight: 700;
                background: #ffffff;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #000000;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
        }
    }
`;