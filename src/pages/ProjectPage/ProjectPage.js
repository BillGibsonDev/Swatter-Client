import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables';

// components
import Bug from './components/Bug.js';
import { ProjectSideNav } from './components/ProjectSideNav';
import { Searchbar } from './components/Searchbar';

// loaders
import ProjectPageLoader from '../../loaders/ProjectPageLoader';

// pop out sections
import CommentSection from './sections/CommentSection';
import BugSection from './sections/BugSection';
import AddBugSection from './sections/AddBugSection';

// router
import { useParams } from 'react-router-dom';

export default function ProjectPage({ user, role }) {

    const commentSection = useRef();
    const bugSection = useRef(null);
    const addBugSection = useRef();

    const { projectId, bugId } = useParams();

    const [ bugs, setBugs ] = useState([]);
    const [ project, setProject ] = useState([]);

    // data states
    //const [ totalBugs, setTotalBugs ] = useState([]);
    const [ openBugs, setOpenBugs] = useState([]);
    const [ underwayBugs, setUnderwayBugs ] = useState([]);
    const [ reviewBugs, setReviewBugs ] = useState([]);
    const [ completedBugs, setCompletedBugs ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);

    // bug section states
    const [ sectionBugId, setSectionBugId ] = useState();
    const [ sectionProjectId, setSectionProjectId ] = useState();

    useEffect(() =>{
        function getProject(){
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setProject(response.data)
                setBugs(response.data.bugs)
                setLoading(false)
               // setTotalBugs(response.data.bugs.length)
                setOpenBugs(response.data.bugs.filter(bugs => bugs.status === "Open"))
                setUnderwayBugs(response.data.bugs.filter(bugs => bugs.status === "Underway"))
                setReviewBugs(response.data.bugs.filter(bugs => bugs.status === "Reviewing"))
                setCompletedBugs(response.data.bugs.filter(bugs => bugs.status === "Completed"))
            })
            .catch(function (error) {
                console.log(error)
            });
        }
        getProject(projectId);
    }, [ projectId, bugId ]);


    const handleShowComments = () => {
        let section = commentSection.current;
        console.log(commentSection.current.style.display)
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const handleShowBug = () => {
        let section = bugSection.current;
        if (section.style.display === "none") {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    }

    const handleShowAddBug = () => {
        let section = addBugSection.current;
        if (section.style.display === "none") {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    }

    return (
        <StyledProjectPage>
            <ProjectSideNav
                project={project}
                handleShowComments={handleShowComments}
                handleShowAddBugs={handleShowAddBug}
            />
            {
                isLoading === true 
                ? <ProjectPageLoader />
                : <div className="bug-table-wrapper">
                    <Searchbar />
                    { 
                        bugs === undefined 
                        ? <div className="undefined">
                            <h1>You've havent entered any bugs</h1>
                        </div>
                        : <>
                            <div className="bugs-container">
                                <h5>Open <span>{openBugs.length}</span></h5>
                                {
                                    openBugs.slice().reverse().map((bug, key) => {
                                        return (
                                            <Bug
                                                setSectionProjectId={setSectionProjectId}
				                                setSectionBugId={setSectionBugId}
                                                projectTitle={project.projectTitle}
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
                                                handleShowBug={handleShowBug}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="bugs-container">
                                <h5>Underway <span>{underwayBugs.length}</span></h5>
                                {
                                    underwayBugs.slice().reverse().map((bug, key) => {
                                        return (
                                            <Bug
                                                setSectionProjectId={setSectionProjectId}
				                                setSectionBugId={setSectionBugId}
                                                handleShowBug={handleShowBug}
                                                projectTitle={project.projectTitle}
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
                            <div className="bugs-container">
                                <h5>Reviewing <span>{reviewBugs.length}</span></h5>
                                {
                                    reviewBugs.slice().reverse().map((bug, key) => {
                                        return (
                                            <Bug
                                                setSectionProjectId={setSectionProjectId}
				                                setSectionBugId={setSectionBugId}
                                                handleShowBug={handleShowBug}
                                                projectTitle={project.projectTitle}
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
                            <div className="bugs-container">
                                <h5>Completed <span>{completedBugs.length}</span></h5>
                                {
                                    completedBugs.slice().reverse().map((bug, key) => {
                                        return (
                                            <Bug
                                                setSectionProjectId={setSectionProjectId}
				                                setSectionBugId={setSectionBugId}
                                                handleShowBug={handleShowBug}
                                                projectTitle={project.projectTitle}
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
                        </>
                    }
                </div>
            }
            <CommentSection
                handleShowComments={handleShowComments}
                user={user}
                role={role}
                commentSection={commentSection}
            />
            <BugSection
                handleShowBug={handleShowBug}
                user={user}
                role={role}
                sectionProjectId={sectionProjectId}
				sectionBugId={sectionBugId}
                bugSection={bugSection}
            />
            <AddBugSection
                handleShowAddBug={handleShowAddBug}
                user={user}
                role={role}
                projectId={projectId}
                addBugSection={addBugSection}
            />
        </StyledProjectPage>
    )
}

const StyledProjectPage = styled.div`
    height: 100%;
    width: 100%;
    max-width: 1400px;
    display: flex;
    position: relative;
    margin-left: 400px;
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
    .bug-table-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 10px;
        grid-column-gap: 10px;
        max-height: 90vh;
        width: 100%;
        overflow-x: scroll;
        overflow-y: scroll;
        margin-top: 5%;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        &:-webkit-scrollbar {
            display: none;
        }
        .bugs-container {
            width: 100%;
            background: black;
            padding: 10px;
            background: #0b2849;
            border-radius: 12px;
            h5 {
                color: ${pallette.helperGrey};
                padding: 10px;
                font-size: ${pallette.paraSize};
                span {
                    font-weight: 400;
                }
            }
            .Open, .Underway, .Reviewing, .Completed {
                display: flex;
                &:hover {
                    background: #000000;
                    border: 1px black solid;
                }
            }
        }
    }
`;