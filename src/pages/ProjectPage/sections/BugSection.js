import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

// components
import BugPageLoader from '../../../loaders/BugPageLoader';

// router
import { Link } from 'react-router-dom';

// images
import X from '../../../assets/icons/whiteX.png';

export default function BugSection({
    user, 
    role, 
    bugId, 
    projectId, 
    handleShowBug, 
    sectionProjectId,
    sectionBugId,
}) {

    //const { projectId, bugId } = useParams();

    const [ author , setAuthor ] = useState("");
    const [ bug, setBug ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        function getBug(){
            axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${sectionProjectId}/${sectionBugId}`)
            .then(function (response){
                setBug(response.data[0].bugs)
                setAuthor(response.data[0].bugs[0].author)
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getBug(sectionProjectId, sectionBugId);
    }, [ sectionProjectId, sectionBugId ]);

    const [ status, setStatus ] = useState(bug.status);
    const [ description, setDescription ] = useState(bug.description);
    const [ priority , setPriority ] = useState(bug.priority);
    const [ tag, setTag ] = useState(bug.tag);

    function updateBug() {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_UPDATE_BUG_URL}/${sectionProjectId}/${sectionBugId}`, {
            description: description,
            status: status,
            tag: tag,
            priority: priority,
            projectId: sectionProjectId,
            bugId: bug._id,
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
            axios.post(`${process.env.REACT_APP_DELETE_BUG_URL}/${sectionProjectId}/${sectionBugId}`, {
                projectId: sectionProjectId,
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
        <StyledBugSection id="bug-section">
            <img id="exit-btn" src={X} alt="Exit" onClick={() => {handleShowBug()}} />
            <div className="breadcrumbs">
                <Link to={`/`}>Home</Link><span>/</span>
                <Link to={`/projects/${sectionProjectId}`}>Project</Link><span>/</span>
                {
                    bug[0] === undefined
                    ? <></>
                    : <p>{bug[0].title}</p>
                }
            </div>
            {
                isLoading === true 
                ? <BugPageLoader />
                : <>
                    {
                        bug.map((bugs, key) => {
                            return (
                                <div className="bug-container" key={key}>
                                    <div className="title-container">
                                        <h1>{bugs.title}</h1>
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
                                        }}
                                    />
                                    <img src={bugs.thumbnail} alt=""/>
                                    <div className="button-container">
                                        {
                                            author === user || role === process.env.REACT_APP_ADMIN_SECRET 
                                            ? <>
                                                <button onClick={updateBug}>Save</button>
                                                <button  id="delete" onClick={deleteBug}>Delete</button>
                                            </>
                                            : <>
                                                <button onClick={unauthorized}>Save</button>
                                                <button id="delete" onClick={unauthorized}>Delete</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            }
        </StyledBugSection >
    )
}

const StyledBugSection = styled.div`
    display: none;
    min-height: 90vh;
    width: 100%;
    top: 8%;
    left: 0;
    position: absolute;
    z-index: 100;
    background: ${pallette.accentColor};
    border-radius: 12px;
    padding: 2%;
    #exit-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        a {
            font-size: 20px;
            color: ${pallette.helperGrey};
            &:hover {
                color: white;
            }
        }
        p {
            font-size: 20px;
            color: ${pallette.helperGrey};
        }
        span {
            margin: 0 10px;
            color: white;
        }
    }
    
    .bug-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
        .title-container {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            h1 {
                color: white;
                font-size: 40px;
            }
        }
        .info-container, .selector-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100%;
            margin: 10px 0 10px 0;
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
                width: 90%;
                margin: 10px 0;
                span {
                    color: #cecece;
                    font-weight: 400;
                    font-size: 16px;
                }
            }
            label {
                display: flex;
                flex-direction: column;
                color: white;
                font-size: 20px;
                margin: 20px 0;
                @media (max-width: 700px){
                    flex-direction: row;
                }
                select {
                    cursor: pointer;
                    width: 90%;
                    font-size: 20px;
                    background: ${pallette.helperGrey};
                }
            }
        }
        textarea {
            margin: 20px 0;
            padding: 10px;
            font-size: 18px;
            background: ${pallette.helperGrey};
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
                width: 200px;
                height: 40px;
                cursor: pointer;
                border: none;
                border-radius: 6px;
                font-weight: 700;
                font-size: ${pallette.subtitleSize};
                @media (max-width: 1050px){
                    margin: 10px 0;
                    width: 150px;
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