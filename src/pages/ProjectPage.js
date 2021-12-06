import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Bug from '../components/Bug.js';
import CommentSection from '../components/CommentSection';
import ProjectPageLoader from '../loaders/ProjectPageLoader';

// router
import { Link, useParams } from 'react-router-dom';

export default function ProjectPage({user, role, lastLogin}) {

    const { projectId, bugId } = useParams();

    const [ bugs, setBugs ] = useState([]);
    const [ project, setProject ] = useState([]);

    // data states
    const [ totalBugs, setTotalBugs ] = useState(0);
    const [ openBugs, setOpenBugs] = useState(0);
    const [ underwayBugs, setUnderwayBugs ] = useState(0);
    const [ reviewBugs, setReviewBugs ] = useState(0);
    const [ completedBugs, setCompletedBugs ] = useState(0);
    const [ isLoading, setLoading ] = useState(true);
   
    useEffect(() =>{
        getProject();
        // eslint-disable-next-line
    }, [ projectId, bugId ]);

    function getProject(){
        axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
        .then(function (response){
            setProject(response.data)
            setBugs(response.data.bugs)
            setLoading(false)
            setTotalBugs(response.data.bugs.length)
            setOpenBugs(response.data.bugs.filter(bugs => bugs.status === "Open").length)
            setUnderwayBugs(response.data.bugs.filter(bugs => bugs.status === "Underway").length)
            setReviewBugs(response.data.bugs.filter(bugs => bugs.status === "Reviewing").length)
            setCompletedBugs(response.data.bugs.filter(bugs => bugs.status === "Completed").length)
        })
        .catch(function (error) {
            console.log(error)
        });
    }


    const handleFilter = (e) => {
        let value = e.target.value
        let open = document.getElementsByClassName(value)
        let i;
        for (i = 0; i < open.length; i++) {
            if (open[i].style.display === "none"){
                open[i].style.display = "flex";
            } else {
                open[i].style.display = "none";
            }
        }
      };

    return (
        <StyledProjectPage>
            {
                isLoading === true ? (
                    <ProjectPageLoader />
                ) : (
                <>
                    <header>
                        <div className="project-title-container">
                            <h2>Project: <span>{project.projectTitle}</span></h2>
                            <h2>Started: <span>{project.startDate}</span></h2>
                            <Link to={`/${projectId}/AddBugPage`}>Add Bug</Link>
                        </div>
                        <div className="data-container">
                            <h5>Open: <span>{openBugs}</span></h5>
                            <h5>Underway: <span>{underwayBugs}</span></h5>
                            <h5>Reviewing: <span>{reviewBugs}</span></h5>
                            <h5>Completed: <span>{completedBugs}</span></h5>
                            <h5 id="total">Total: <span>{totalBugs}</span></h5>
                        </div>
                    </header>
                    { 
                        bugs === undefined ? (
                            <div className="undefined">
                                <h1>You've havent entered any bugs</h1>
                            </div>
                            ) : (
                            <>
                                <div className="active-wrapper">
                                    <h3>Show:</h3>
                                    <div className="status-filter-container">
                                        <label>Open
                                            <input 
                                                type="checkbox" 
                                                id="Open"
                                                value="Open"
                                                defaultChecked 
                                                onClick={handleFilter} />
                                        </label>
                                        <label>Underway
                                            <input 
                                                type="checkbox" 
                                                id="Open" 
                                                value="Underway"
                                                defaultChecked 
                                                onClick={handleFilter}
                                                />
                                        </label>
                                        <label>Reviewing
                                            <input 
                                                type="checkbox" 
                                                id="inReview" 
                                                value="Reviewing"
                                                defaultChecked 
                                                onClick={handleFilter}
                                                />
                                        </label>
                                        <label>Completed
                                            <input 
                                                type="checkbox" 
                                                id="completed" 
                                                value="Completed"
                                                defaultChecked
                                                onClick={handleFilter}
                                                />
                                        </label>
                                    </div>
                                    <div className="bugs-container">
                                        {
                                            bugs.slice().reverse().map((bug, key) => {
                                                return (
                                                    <Bug
                                                        projectId = {projectId}
                                                        bugId={bug._id}
                                                        title={bug.title}
                                                        thumbnail = {bug.thumbnail}
                                                        description = {bug.description}
                                                        priority={bug.priority}
                                                        author={bug.author}
                                                        status={bug.status}
                                                        tag={bug.tag}
                                                        lastUpdate={bug.lastUpdate}
                                                        key={key}
                                                        user={user}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            <CommentSection
                                role={role}
                                user={user}
                            />
                        </>
                        )
                    }
                </>
                )
            }
        </StyledProjectPage>
    )
}

const StyledProjectPage = styled.div`
min-height: 80vh;
border-radius: 20px;
width: 90%;
margin: auto;
display: flex;
flex-direction: column;
background: #cbdff7;
    @media (max-width: 1050px){
        width: 98%;
    }
    .undefined {
        background: white;
        width: 100%;
        min-height: 80vh;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    header {
        background: #f1f1f1;
        border-radius: 12px 12px 0 0;
        margin: 0 auto;
        width: 100%;
        min-height: 10vh;
        justify-content: space-around;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .project-title-container {
        border-radius: 12px;
        margin: 10px auto;
        width: 100%;
        justify-content: space-around;
        display: flex;
        align-items: center;
            @media (max-width: 750px){
                width: 90%;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin: 10px auto;
            }
            h2 {
                color: #444444;
                font-size: 1.2em;
                span {
                    color: black;
                    font-size: 1.5em;
                }
                @media (max-width: 750px){
                    font-size: 1em;
                    margin: 6px 0;
                }
            }
            a {
                background: #ffffff;
                padding: 0 6px;
                border-radius: 4px;
                font-size: 16px;
                font-weight: bold;
                color: #0f4d92;
                @media (max-width: 750px){
                    margin: 10px 0;
                }
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                    background: #0f4d92;
                    transition: 0.2s;
                    transform: scale(1.01);
                }
            }
    }
    .data-container {
        margin: 20px auto;
        display: flex;
        width: 80%;
        justify-content: space-between;
            @media (max-width: 750px){
                width: 90%;
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
        h5 {
            color: #444444;
            font-size: 14px;
            @media (max-width: 750px){
                font-size: 11px;
                margin: 4px 0;
            }
            span {
                color: black;
                font-size: 16px;
                color: #0f4d92;
            }
        }
        #total {
            @media (max-width: 750px){
                border-top: 1px solid black;
            }
        }
    }
    .active-wrapper {
        height: 100%;
        display: flex;
        margin-top: 2%;
        flex-direction: column;
        align-items: center;
        h3 {
            color: #0f4d92;
            font-size: 1.5em;
            margin-right: 16px;
        }
        .status-filter-container {
            display: flex;
            width: 70%;
            align-items: center;
            justify-content: space-between;
            margin: 10px auto 16px auto;
            @media (max-width: 750px){
                width: 90%;
                display: grid;
                grid-template-columns: 1fr 1fr;
            }
        }
        label {
            display: flex;
            height: 100%;
            color: #000000;
            align-items: center;
            height: 100%;
            font-weight: bold;
            margin: 6px;
            input {
                border-radius: 4px;
                border: none;
                margin: 0 6px;
            }

        }
        .bugs-container {
            width: 98%;
            margin: auto;
            .Open, .Underway, .Reviewing, .Completed {
                display: flex;
                &:hover {
                    background: #87befc;
                    border: 1px black solid;
                }
            }
        }
    } 
`;