import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link, useParams } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';

export default function EditProjectPage({user, role, confirmRole}) {

    const { projectId } = useParams();

    const [ project, setProject ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() =>{
        setAuthor(user);
        getProject();
        // eslint-disable-next-line
    }, [ projectId]);

    function getProject(){
        axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
        .then(function (response){
            setProject(response.data)
            setLoading(false)
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    const [ projectTitle, setProjectTitle] = useState(project.projectTitle);
    const [ startDate, setStartDate] = useState(project.startDate);
    const [ author, setAuthor ] = useState(user);
    const [ projectLink, setProjectLink ] = useState(project.projectLink);
    const [ projectImage, setProjectImage ] = useState(project.projectImage);

    function editProject() {
        confirmRole(role);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_UPDATE_PROJECT_URL}/${projectId}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
            projectLink: projectLink,
            projectImage: projectImage,
        })
        .then(function(response) {
            if(response.data !== "Project Updated"){
                setLoading(false);
                alert("Server Error - Project not created")
            } else {
                setLoading(false);
                alert('Project Updated!');
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
                ) :isLoading === true ? (    
                    <Loader/>
                ) : (
                <div className="form-wrapper">
                    <label>Title
                        <input 
                            type="text"
                            id="title"
                            defaultValue={project.projectTitle}
                            onChange={(event) => {
                                setProjectTitle(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Link
                        <input 
                            type="text"
                            id="projectLink"
                            defaultValue={project.projectLink}
                            onChange={(event) => {
                                setProjectLink(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Date
                        <input 
                            type="text" 
                            id="date"
                            defaultValue={project.startDate}
                            onChange={(event) => {
                                setStartDate(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Image
                        <input 
                            type="text" 
                            id="image"
                            defaultValue={project.projectImage}
                            onChange={(event) => {
                                setProjectImage(event.target.value);
                            }} 
                        />
                    </label>
                    <div className="button-container">
                    {
                        role === process.env.REACT_APP_GUEST_SECRET ? (
                            <button onClick={unauthorized}>Update</button>
                        ) : (    
                            <button onClick={editProject}>Update</button>
                        )
                    }
                    <Link id="back-button" to={`/`}>Go Back</Link>
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
min-height: 50vh;
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
                background: #d1d1d1;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #0f4d92;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
        }
    }
`;