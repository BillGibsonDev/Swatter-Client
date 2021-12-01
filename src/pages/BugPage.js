import {useEffect, useState} from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { useParams, Link } from 'react-router-dom';

export default function BugPage({user, role}) {

    const { projectId, bugId } = useParams();

    const [ author , setAuthor ] = useState("");
    const [ bug, setBug ] = useState([]);

    function getBug(){
        axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
        .then(function (response){
            setBug(response.data[0].bugs)
            setAuthor(response.data[0].bugs[0].author)
        })
        .catch(function (error) {
            throw error;
        });
    }

    const [ lastUpdate, setLastUpdate ] = useState("");

    function handleDate(){
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
        setLastUpdate(date);
    }

    useEffect(() =>{
        getBug(projectId);
        handleDate();
        // eslint-disable-next-line
    }, [ projectId, bugId ]);

    const [ status, setStatus ] = useState(bug.status);
    const [ description, setDescription ] = useState(bug.description);
    const [ priority , setPriority ] = useState(bug.priority);
    const [ tag, setTag ] = useState(bug.tag);

    function updateBug() {
        axios.post(`${process.env.REACT_APP_UPDATE_BUG_URL}/${projectId}/${bugId}`, {
            description: description,
            status: status,
            tag: tag,
            priority: priority,
            projectId: projectId,
            bugId: bug._id,
            lastUpdate: lastUpdate,
        })
        .then(function(response) {
            if(response.data !== "Bug Updated"){
                alert("Server Error - Bug not updated")
            } else {
                alert('Bug Updated!');
            }
        })
    }

    function deleteBug(){
        axios.post(`${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`, {
            projectId: projectId,
            bugId: bug._id,
        })
        .then(function(response) {
                if(response.data !== "Bug Deleted"){
                    alert("Server Error - Bug not deleted")
                } else {
                    alert('Bug Deleted');
                }
            })
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledBugPage>
            {
                bug.map((bugs, key) => {
                        return (
                            <div className="bug-container" key={key}>
                                <h1>{bugs.title}</h1>
                                <div className="info-wrapper">
                                    <div className="info-container">
                                        <h2><span>Creator: </span>{bugs.author}</h2>
                                        <h2><span>Created: </span>{bugs.date}</h2>
                                        <h2><span>Updated: </span>{bugs.lastUpdate}</h2>
                                    </div>
                                    <div className="selector-container">
                                        <label>Tag:
                                            <select 
                                                id="tag"
                                                onChange={(event) => {
                                                    setTag(event.target.value);
                                                }}>
                                                <option value={bugs.tag}>{bugs.tag}</option>
                                                <option value="Bug">Bug</option>
                                                <option value="Feature">Feature</option>
                                                <option value="Enhancement">Enhancement</option>
                                            </select>
                                        </label>
                                        <label>Priority:
                                            <select
                                                id="priority"
                                                defaultValue={bug.priority}
                                                onChange={(event) => {
                                                    setPriority(event.target.value);
                                            }}>
                                                <option value={bugs.priority}>{bugs.priority}</option>
                                                <option value="Standard">Standard</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                        </label>
                                        <label>Status:
                                            <select
                                                id="status"
                                                defaultValue={bug.status}
                                                onChange={(event) => {
                                                    setStatus(event.target.value);
                                            }}>
                                                <option value={bugs.status}>{bugs.status}</option>
                                                <option value="Open">Open</option>
                                                <option value="Underway">Underway</option>
                                                <option value="Reviewing">Reviewing</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                                <textarea
                                    type="text"
                                    cols="30"
                                    rows="10"
                                    id="description"
                                    defaultValue={bugs.description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                }}/>
                                <img src={bugs.thumbnail} alt=""/>
                                <div className="button-container">
                                    {
                                        author === user || role === process.env.REACT_APP_ADMIN_SECRET ? (
                                            <>
                                                <button onClick={updateBug}>Save</button>
                                                <button  id="delete" onClick={deleteBug}>Delete</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={unauthorized}>Save</button>
                                                <button id="delete" onClick={unauthorized}>Delete</button>
                                            </>
                                        )
                                    }
                                    <Link to={`/projects/${projectId}`}>Back to Project</Link>
                                </div>
                            </div>
                        )

                    }
                )
            }
        </StyledBugPage>
    )
}

const StyledBugPage = styled.div `
width: 90%;
min-height: 80vh;
border-radius: 12px;
margin: auto;
margin-bottom: 5%;
background: #9dc3ee;
    .bug-container {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: auto;
        h1 {
            font-size: 3em;
        }
        .info-container, .selector-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 80%;
            margin: 20px 0 10px 0;
            h2 {
                color: #353535;
                font-size: 1.5em;
                margin: 10px 0;
                span {
                    font-weight: 400;
                    font-size: 16px;
                }
            }
        }
        label {
            margin: 10px 0;
        }
        select {
            margin-left: 6px;
            cursor: pointer;
        }
        textarea {
            margin: 20px 0;
        }
        img {
            width: 300px;
        }
        .button-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 2% 0;
            button {
                width: 100px;
                cursor: pointer;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                    &:hover {
                        color: #ffffff;
                        background: #326be6;
                        transform: scale(1.05);
                        transition: 0.3s;
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
            a {
                cursor: pointer;
                color: black;
                font-weight: 700;
                &:hover {
                    color: #2828a0;
                    transform: scale(1.05);
                    transition: 0.3s;
                }
            }
        }
    }

`;
