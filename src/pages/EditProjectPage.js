import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link, useParams, useHistory } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';

export default function EditProjectPage({user, role, confirmRole}) {

    const { projectId } = useParams();
    const history = useHistory();

    const [ project, setProject ] = useState([]);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() =>{
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
        setAuthor(user);
        getProject(projectId);
    }, [ projectId, user]);

    function deleteProject(){
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.REACT_APP_DELETE_PROJECT_URL}/${projectId}`)
            .then(function(response){
                if(response.data !== "Project Deleted"){
                    setLoading(false);
                    alert("Server Error - Project not updated")
                } else {
                    history.push("/");
                    setLoading(false);
                    alert('Project Deleted!');
                }
            })
        }
    }

    const [ projectTitle, setProjectTitle] = useState(project.projectTitle);
    const [ startDate, setStartDate] = useState(project.startDate);
    const [ author, setAuthor ] = useState(user);
    const [ projectLink, setProjectLink ] = useState(project.projectLink);
    const [ projectImage, setProjectImage ] = useState(project.projectImage);
    const [ projectKey, setProjectKey ] = useState(project.projectKey);
    const [ description, setDescription ] = useState(project.description);
    const [ repositiory, setRepositiory ] = useState(project.repositiory);
    const [ projectLead, setProjectLead ] = useState(project.projectLead);
    const [ projectType, setProjectType ] = useState(project.projectType);

    function editProject() {
        confirmRole(role);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_UPDATE_PROJECT_URL}/${projectId}`, {
            projectTitle: projectTitle,
            startDate: startDate,
            author: author,
            projectLink: projectLink,
            projectImage: projectImage,
            repositiory: repositiory,
            description: description,
            projectKey: projectKey,
            projectLead: projectLead,
            projectType: projectType
        })
        .then(function(response) {
            if(response.data !== "Project Updated"){
                setLoading(false);
                alert("Server Error - Project not updated")
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
            <div className="title-container">
                <h1>Edit Project</h1>
                <Link id="back-button" to={`/`}>Back</Link>
            </div>
            {
                user === null 
                ? <h1>You are signed out</h1>
                : isLoading === true ? <Loader/>
                : <div className="form-wrapper">
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
                    <label>Key
                        <input 
                            type="text"
                            id="key"
                            defaultValue={project.projectKey}
                            onChange={(event) => {
                                setProjectKey(event.target.value);
                            }} 
                        />
                    </label>
                    <label>URL
                        <input 
                            type="text"
                            id="projectLink"
                            defaultValue={project.projectLink}
                            onChange={(event) => {
                                setProjectLink(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Repository
                        <input 
                            type="text"
                            id="repositiory"
                            defaultValue={project.repositiory}
                            onChange={(event) => {
                                setRepositiory(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Lead
                        <input 
                            type="text" 
                            id="projectLead"
                            defaultValue={project.projectLead}
                            onChange={(event) => {
                                setProjectLead(event.target.value);
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
                    <label>Project Type
                        <input 
                            type="text" 
                            id="projectType"
                            defaultValue={project.projectType}
                            onChange={(event) => {
                                setProjectType(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Description
                        <input 
                            type="text" 
                            id="description"
                            defaultValue={project.description}
                            onChange={(event) => {
                                setDescription(event.target.value);
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
                            role === process.env.REACT_APP_GUEST_SECRET 
                            ? <button onClick={unauthorized}>Update</button>
                            : <button onClick={editProject}>Update</button>
                        }
                        {
                            author === user || role === process.env.REACT_APP_ADMIN 
                            ? <button  id="delete" onClick={deleteProject}>Delete</button>
                            : <button onClick={unauthorized}>Update</button>
                        }
                    </div>
                </div>
            }
        </StyledProjectPage>
    ) 
}

const StyledProjectPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    min-height: 50vh;
    margin: auto;
    @media (max-width: 750px){
        height: 40vh;
        width: 90%;
    }
    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        @media (max-width: 750px){
            width: 90%;
        }
        h1 {
            color: white;
            font-size: 2em;
        }
        #back-button {
            width: 100px;
            cursor: pointer;
            border: none;
            border-radius: 6px;
            font-weight: 700;
            font-size: 1.2em;
            @media (max-width: 1050px){
                margin: 10px 0;
                width: 50px;
            }
            &:hover {
                color: #ffffff;
                background: #000000;
                transform: scale(1.05);
                transition: 0.3s;
            }
        }
    }
    .form-wrapper {
        width: 100%;
        margin: 2% auto;
        label {
            display: flex;
            color: white;
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
                background: #d1d1d1;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #000000;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
            #delete {
                color: white;
                background: red;
                &:hover {
                    color: black;
                    background: #df6464;
                    transform: scale(1.05);
                    transition: 0.3s;
                }
            }
        }
    }
`;