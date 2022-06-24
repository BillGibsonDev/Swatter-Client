import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import X from '../../../assets/icons/whiteX.png';

// router
import { Link } from 'react-router-dom';

// components
import Loader from '../../../loaders/Loader';

export default function AddBugSection({
    user, 
    role, 
    confirmRole, 
    projectId, 
    addBugSection, 
    handleShowAddBug,
    rerender,
    setRerender
}) {

    const [ title, setTitle ] = useState("");
    const [ thumbnail, setThumbnail ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ priority, setPriority ] = useState("");
    const [ tag, setTag ] = useState("");
    const [ isLoading, setLoading ] = useState(false);

    function addBug() {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_ADD_BUG_URL}/${projectId}/bugs`, {
            projectId: projectId,
            title: title,
            description: description,
            thumbnail: thumbnail,
            status: status,
            author: author,
            priority: priority,
            tag: tag,
            role: role,
        })
        .then(function(response) {
            if(response.data !== "Bug Created"){
                setLoading(false);
                alert("Server Error - Bug not created");
            } else {
                setRerender(!rerender);
                setLoading(false);
                alert('Bug Created!');
            }
        })
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledAddBug ref={addBugSection} style={{display: "none"}}> 
            <img id="exit-btn" src={X} alt="Exit" onClick={() => {handleShowAddBug()}} />
            <h1>Add a Bug</h1>
            {
                user === null ? <h1>You are signed out</h1>
                : isLoading === true ? <Loader />
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
                            <label>Image
                                <input 
                                    type="text"
                                    id="thumbnail"
                                    onChange={(event) => {
                                        setThumbnail(event.target.value);
                                    }} 
                                />
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
                    <div className="button-container">
                        {
                            role === process.env.REACT_APP_USER_SECRET || role === process.env.REACT_APP_ADMIN_SECRET 
                            ? <button onClick={()=>{confirmRole(); addBug();}}>Save</button>
                            : <button onClick={unauthorized}>Save</button>
                        }
                        <Link to={`/projects/${projectId}`}>Back</Link>
                    </div>
                </div>
            }
        </StyledAddBug>
    ) 
}

const StyledAddBug = styled.div`
    display: none;
    flex-direction: column;
    min-height: 96vh;
    height: 100%;
    width: 100%;
    margin: 16px auto;
    position: absolute;
    z-index: 100;
    background: ${pallette.accentColor};
    border-radius: 12px;
    padding: 2%;
    animation-name: slideLeft;
    animation-duration: .5s;
    @media (max-width: 810px){
        top: 0;
        left: -65px;
        margin: 0;
        width: 100vw;
        height: 100%;
        border-radius: 0;
        animation-name: slideLeft810;
        animation-duration: .5s;
    }
    @media (max-width: 390px){
        left: -65px;
        animation-name: slideLeft390;
        animation-duration: .5s;
    }
    #exit-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    h1 {
        color: white;
        font-size: 24px;
        width: 98%;
        font-size: 40px;
        @media (max-width: 450px){
            font-size: 30px;
        }
    }
    .form-wrapper {
        width: 100%;
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
            margin: 20px 0;
            font-size: ${pallette.subtitleSize};
            @media (max-width: 750px){
               font-size: ${pallette.paraSize};
            }
            @media (max-width: 450px){
                font-size: 16px;
                margin: 10px 0;
            }
            input, select {
                width: 100%;
                height: 40px;
                padding: 5px 10px;
                font-size: 18px;
                background: ${pallette.helperGrey};
                @media (max-width: 450px){
                    height: 30px;
                    font-size: 16px;
                }
            }
            textarea {
                padding: 10px;
                font-size: 18px;
                background: ${pallette.helperGrey};
                @media (max-width: 450px){
                    font-size: 16px;
                }
            }
        }
        .button-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2%;
            button, a {
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
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #000000;
                    transition: 0.2s;
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
    }

`;