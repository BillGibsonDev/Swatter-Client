import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// router
import { Link, useParams } from 'react-router-dom';

// functions
import { unauthorized } from '../functions/unauthorized.js';

// components
import Loader from '../loaders/Loader';

export default function AddBugPage({
    user, 
    role, 
    confirmRole
}) {

    const { projectId } = useParams();

    const [ title, setTitle ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ priority, setPriority ] = useState("");
    const [ tag, setTag ] = useState("");
    const [ isLoading, setLoading ] = useState(false);
    const [ sprint, setSprint ] = useState('');
    const [ options, setOptions ] = useState([]);

    useEffect(() =>{
        const getProject = (projectId) => {
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setOptions(response.data.sprints)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
       getProject(projectId);
    }, [ projectId ]); 
    
    const addBug = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_ADD_BUG_URL}/${projectId}/bugs`, {
            projectId: projectId,
            title: title,
            description: description,
            status: status,
            author: author,
            priority: priority,
            tag: tag,
            role: role,
            sprint: sprint,
            images: images,
        })
        .then(function(response) {
            if(response.data !== "Bug Created"){
                setLoading(false);
                alert("Server Error - Bug not created");
            } else {
                setLoading(false);
                alert('Bug Created!');
            }
        })
    }

    const [images, setImages] = useState([
        { 
            image: '', 
            caption: '',
        }
    ]);

    const handleAddFields = () => {
        const values = [...images];
        values.push({ image: '', caption: '' });
        setImages(values);
    };

    const handleRemoveFields = index => {
        const values = [...images];
        values.splice(index, 1);
        setImages(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...images];
        if (event.target.name === "image") {
            values[index].image = event.target.value;
        } else if(event.target.name === "caption") {
            values[index].caption = event.target.value;
        }
        setImages(values);
    };

    return (
        <StyledAddBug> 
            <div className="breadcrumbs">
                <Link to={`/`}>Home</Link><span>/</span>
                <Link to={`/projects/${projectId}`}>Project</Link><span>/</span>
                <p>Add Bug</p>
            </div>
            <h1>Add a Bug</h1>
            {
                user === null ? <h1>You are signed out</h1>
                : isLoading 
                ? <Loader />
                : <div className="form-wrapper">
                    <div className="container-wrapper">
                        <div className="left-container">
                            <label>Title
                                <input 
                                    type="text"
                                    id="title"
                                    onChange={(event) => {
                                        setTitle(event.target.value);
                                    }} 
                                />
                            </label>
                            <label>Created By
                                <input
                                    readOnly 
                                    defaultValue={user}
                                    type="text" 
                                    id="author" 
                                    onChange={(event) => {
                                        setAuthor(event.target.value);
                                    }}
                                />
                            </label>
                            <label>Sprint:
                                {
                                    options === undefined 
                                    ?<></>    
                                    :<select
                                        id="sprint"
                                        onChange={(event) => {
                                            setSprint(event.target.value);
                                        }}>
                                            <option value="">None</option>
                                        {
                                            options.map((sprint, key) => {
                                                return(
                                                    <option key={key} value={`${sprint.title}`}>{sprint.title}</option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            </label>
                        </div>
                        <div className="right-container">
                            <label>Priority
                                <select 
                                    id="status"
                                    onChange={(event) => {
                                        setPriority(event.target.value);
                                    }}>
                                    <option value=""></option>
                                    <option value="Standard">Standard</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </label>
                            <label>Status
                                <select 
                                    id="status"
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                    }}>
                                    <option value=""></option>
                                    <option value="Open">Open</option>
                                    <option value="Underway">Underway</option>
                                    <option value="Reviewing">Reviewing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                            <label>Tag
                                <select 
                                    id="status"
                                    onChange={(event) => {
                                        setTag(event.target.value);
                                    }}>
                                    <option value=""></option>
                                    <option value="Bug">Bug</option>
                                    <option value="Enhancement">Enhancement</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Redesign">Redesign</option>
                                    <option value="Task">Task</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <label>Description
                        <textarea 
                            type="text" 
                            cols="30" 
                            rows="10" 
                            id="description"
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                        />
                    </label> 
                    {
                        images.map((image, index) => {
                            return (
                                <section id="paragraph-section" key={index}>
                                    <div className="info-container">
                                        <div className="input-container">
                                            <label>Image
                                                <input
                                                    type="text"
                                                    id="image"
                                                    name="image"
                                                    onChange={event => handleInputChange(index, event)}
                                            /></label>
                                            <label>Caption
                                                <input
                                                    type="text"
                                                    id="caption"
                                                    name="caption"
                                                    onChange={event => handleInputChange(index, event)}
                                            /></label>
                                        </div>
                                    </div>
                                    <div className="buttons-container">
                                        <button onClick={handleAddFields}>Another Image</button>
                                        {
                                            images.length === 1 
                                            ? <button id="remove-button">Remove</button>
                                            : <button id="remove-button" onClick={handleRemoveFields}>Remove</button>
                                        }
                                    </div>
                                </section>
                            )
                        })
                    }
                    {
                        role === process.env.REACT_APP_USER_SECRET || role === process.env.REACT_APP_ADMIN_SECRET 
                        ? <button style={{marginTop: '40px'}} onClick={()=>{confirmRole(); addBug();}}>Save</button>
                        : <button style={{marginTop: '40px'}} onClick={() => unauthorized()}>Save</button>
                    }
                </div>
            }
        </StyledAddBug>
    ) 
}

const StyledAddBug = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 96vh;
    height: 100%;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 834px){
        width: 80%;
        height: 100%;
        border-radius: 0;
    }
    @media (max-width: 428px){
        margin-left: 60px;
        padding: 10px;
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        @media (max-width: 428px){
            display: none;
        }
        a {
            border: none;
            background: none;
            font-size: 16px;
            color: ${pallette.helperGrey};
            cursor: pointer;
            @media (max-width: 450px){
                font-size: 12px;
            }
            &:hover {
                color: white;
            }
        }
        p {
            font-size: 16px;
            color: ${pallette.helperGrey};
            @media (max-width: 450px){
                font-size: 12px;
            }
        }
        span {
            margin: 0 10px;
            color: white;
        }
    }
    h1 {
        color: white;
        font-size: 30px;
        margin: 10px 0;
        @media (max-width: 450px){
            font-size: 20px;
        }
    }
    .form-wrapper {
        width: 100%;
        height: 100%;
        margin: 20px auto;
        @media (max-width: 450px){
            margin: 10px auto;
        }
        .container-wrapper {
            display: flex;
            width: 100%;
            @media (max-width: 800px){
                flex-direction: column;
            }
            .right-container, .left-container {
                width: 45%;
                @media (max-width: 800px){
                    width: 100%;
                }
            }
            .right-container {
                margin-left: auto;
                @media (max-width: 800px){
                    margin: 0;
                }
            }
        }
        label {
            display: flex;
            color: white;
            flex-direction: column;
            margin: 10px 0;
            font-size: ${pallette.labelSize};
            @media (max-width: 750px){
               font-size: 14px;
            }
            @media (max-width: 450px){
                margin: 10px 0;
            }
            input, select {
                width: 100%;
                height: 30px;
                padding: 2px;
                background: ${pallette.helperGrey};
            }
            textarea {
                padding: 10px;
                background: ${pallette.helperGrey};
            }
        }
        .buttons-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            #remove-button {
                background: none;
                border: red 1px solid;
                color: red;
            }
        }
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 40px;
            cursor: pointer;
            border: none;
            border-radius: 4px;
            font-size: ${pallette.subtitleSize};
            font-weight: 700;
            background: #ffffff;
            color: ${pallette.accentColor};
            margin-top: 16px;
            transition: 0.2s;
            &:hover{
                color: #ffffff;
                cursor: pointer;
                background: #000000;
                transform: scale(1.01);
            }
            @media (max-width: 750px){
                width: 100px;
                font-size: ${pallette.paraSize};
            }
            @media (max-width: 450px){
                font-size: 16px;
                width: 100px;
            }
        }
        
    }

`;