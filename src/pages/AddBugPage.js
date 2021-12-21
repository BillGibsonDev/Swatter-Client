import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { useParams, Link } from 'react-router-dom';

// components
import Loader from '../loaders/Loader';


export default function Bug({user, role, confirmRole}) {

    const { projectId } = useParams();

    const [ title, setTitle ] = useState("");
    const [ date, setDate ] = useState("");
    const [ thumbnail, setThumbnail ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ author, setAuthor ] = useState(user);
    const [ priority, setPriority ] = useState("");
    const [ tag, setTag ] = useState("");
    const [ lastUpdate, setLastUpdate ] = useState("");
    const [ isLoading, setLoading ] = useState(false);

    function handleDate(){
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
        setDate(date);
        setLastUpdate(date);
    }

    useEffect(() => {
       handleDate()
    }, []);

    function addBug() {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_ADD_BUG_URL}/${projectId}/bugs`, {
            projectId: projectId,
            title: title,
            date: date,
            description: description,
            thumbnail: thumbnail,
            status: status,
            author: author,
            priority: priority,
            tag: tag,
            lastUpdate: lastUpdate,
            role: role,
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

    const clearForm = () =>{
        document.getElementById('title').value = '';
        document.getElementById('thumbnail').value = '';
        document.getElementById('description').value = '';
        alert('Form Cleared')
    }

    function unauthorized() {
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledBug>
            {
                user === null ? (
                    <h1>You are signed out</h1>
                ) :isLoading === true ? (
                    <Loader />
                ) : (    
                <div className="form-wrapper">
                    <label>Title
                        <input 
                            type="text"
                            id="title"
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }} 
                        />
                    </label>
                    <label>Date
                        <input 
                            type="text" 
                            id="date"
                            defaultValue={date}
                            onChange={(event) => {
                                setDate(event.target.value);
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
                    <label>Tag
                        <select 
                            id="status"
                            onChange={(event) => {
                                setTag(event.target.value);
                            }}>
                            <option value=""></option>
                            <option value="Bug">Bug</option>
                            <option value="Feature">Feature</option>
                            <option value="Enhancement">Enhancement</option>
                            <option value="Task">Task</option>
                        </select>
                    </label>
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
                    <label>Image
                        <input 
                            type="text"
                            id="thumbnail"
                            onChange={(event) => {
                                setThumbnail(event.target.value);
                            }} 
                        />
                    </label>
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
                        <div className="div">
                        {
                            role === process.env.REACT_APP_USER_SECRET || role === process.env.REACT_APP_ADMIN_SECRET ? (
                                <button onClick={()=>{confirmRole(); addBug();}}>Save</button>
                        ) : (    
                                <button onClick={unauthorized}>Save</button>
                            )
                        }
                            <button id="clear" onClick={clearForm}>Clear</button>
                        </div>
                        <Link id="back-button" to={`/projects/${projectId}`}>Go Back</Link>
                    </div>
                </div>
            )}
        </StyledBug>
    ) 
}

const StyledBug = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    width: 100%;
    max-width: 1000px;
    background: #fff;
    margin: auto;
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
                textarea {
                    padding: 2px;
                }
            }
            .button-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 2%;
                button {
                    width: 100px;
                    cursor: pointer;
                    margin: 0 20px;
                    background: #d1d1d1;
                    border: none;
                    font-weight: 700;
                    font-size: 1.2em;
                    @media (max-width: 420px){
                        width: 80px;
                        font-size: 1em;
                    }
                    &:hover{
                        color: #ffffff;
                        cursor: pointer;
                        background: #0f4d92;
                        transition: 0.2s;
                        transform: scale(1.01);
                    }
                }
                #clear{
                    background: lightcoral;
                    &:hover{
                        color: #000000;
                        cursor: pointer;
                        background: #ff0000;
                        transition: 0.2s;
                        transform: scale(1.01);
                    }
                }
            }
    }
`;