import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import BugPageLoader from '../loaders/BugPageLoader';

// router
import { useParams, Link } from 'react-router-dom';

export default function BugPage({user, role}) {

    const { projectId, bugId } = useParams();

    const [ author , setAuthor ] = useState("");
    const [ bug, setBug ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)
    const [ lastUpdate, setLastUpdate ] = useState("");

    useEffect(() => {
        function getBug(){
            axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
            .then(function (response){
                setBug(response.data[0].bugs)
                setAuthor(response.data[0].bugs[0].author)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        function handleDate(){
            const current = new Date();
            const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
            setLastUpdate(date);
        }
        getBug(projectId);
        handleDate();
    }, [ projectId, bugId ]);

    const [ status, setStatus ] = useState(bug.status);
    const [ description, setDescription ] = useState(bug.description);
    const [ priority , setPriority ] = useState(bug.priority);
    const [ tag, setTag ] = useState(bug.tag);

    function updateBug() {
        setLoading(true);
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
                setLoading(false);
                alert("Server Error - Bug not updated")
            } else {
                setLoading(false);
                alert('Bug Updated!');
            }
        })
    }

    function deleteBug(){
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.post(`${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`, {
                projectId: projectId,
                bugId: bug._id,
            })
            .then(function(response) {
                    if(response.data !== "Bug Deleted"){
                        setLoading(false);
                        alert("Server Error - Bug not deleted")
                    } else {
                        setLoading(false);
                        alert('Bug Deleted');
                    }
                })
        }
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledBugPage>
            {
                isLoading === true ? (
                    <>
                        <BugPageLoader />
                    </>
                ) : (
                    <>
                        {
                            bug.map((bugs, key) => {
                                return (
                                    <div className="bug-container" key={key}>
                                        <div className="title-container">
                                            <h1>{bugs.title}</h1>
                                            <Link id="back-button" to={`/projects/${projectId}`}>Back</Link>
                                        </div>
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
                                                        <option value="Task">Task</option>
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
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </>)
            }
        </StyledBugPage>
    )
}

const StyledBugPage = styled.div `
    min-height: 80vh;
    width: 100%;
    max-width: 1000px;
    margin: 50px auto 5% auto;
    @media (max-width: 700px){
        margin: 20px auto 5% auto;
    }
    .bug-container {
        display: flex;
        flex-direction: column;
        width: 95%;
        margin: auto;
        .title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            h1 {
                color: white;
                font-size: 3em;
            }
            #back-button {
                width: 150px;
                cursor: pointer;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                font-size: 1.2em;
                @media (max-width: 1050px){
                    margin: 10px 0;
                    width: 100px;
                }
                &:hover {
                    color: #ffffff;
                    background: #000000;
                    transform: scale(1.05);
                    transition: 0.3s;
                }
            }
        }
        .info-container, .selector-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            width: 100%;
            margin: 20px 0 10px 0;
            @media (max-width: 700px){
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            h2 {
                color: white;
                font-size: 20px;
                display: flex;
                flex-direction: column;
                span {
                    color: #cecece;
                    font-weight: 400;
                    font-size: 16px;
                }
                &:last-child {
                    margin-left: auto;
                    @media (max-width: 700px){
                        margin: 0;
                    }
                }
            }
        }
        label {
            color: white;
            font-size: 20px;
            &:last-child {
                margin-left: auto;
                @media (max-width: 700px){
                    margin: 0;
                }
            }
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
                width: 150px;
                cursor: pointer;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                font-size: 1.2em;
                @media (max-width: 1050px){
                    margin: 10px 0;
                    width: 100px;
                }
                &:hover {
                    color: #ffffff;
                    background: #000000;
                    transform: scale(1.05);
                    transition: 0.2s;
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
