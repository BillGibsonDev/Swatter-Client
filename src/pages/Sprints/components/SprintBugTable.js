// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// components
import Bug from '../../ProjectPage/components/Bug.js';

// redux
import { connect } from 'react-redux';

const SprintBugTable = ({ 
    bugs,
    openBugs, 
    underwayBugs, 
    reviewBugs, 
    completedBugs,
    projectId,
    project
}) => {

    return (
        <StyledBugTable>
            { 
                !bugs 
                ? <div className="undefined">
                    <h1>You've haven't entered any bugs</h1>
                </div>
                : <>
                    <div className="bugs-container">
                        <h5>Open <span>{openBugs.length}</span></h5>
                        {
                            openBugs.slice().reverse().map((bug, key) => {
                                return (
                                    <Bug
                                        project={project}
                                        projectTitle={project.projectTitle}
                                        projectId={projectId}
                                        bugId={bug._id}
                                        title={bug.title}
                                        thumbnail={bug.thumbnail}
                                        description={bug.description}
                                        priority={bug.priority}
                                        author={bug.author}
                                        status={bug.status}
                                        tag={bug.tag}
                                        lastUpdate={bug.lastUpdate}
                                        key={key}
                                        
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
                                        project={project}
                                        projectTitle={project.projectTitle}
                                        projectId={projectId}
                                        bugId={bug._id}
                                        title={bug.title}
                                        thumbnail={bug.thumbnail}
                                        description={bug.description}
                                        priority={bug.priority}
                                        author={bug.author}
                                        status={bug.status}
                                        tag={bug.tag}
                                        lastUpdate={bug.lastUpdate}
                                        key={key}
                                        
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
                                        project={project}
                                        projectTitle={project.projectTitle}
                                        projectId={projectId}
                                        bugId={bug._id}
                                        title={bug.title}
                                        thumbnail={bug.thumbnail}
                                        description={bug.description}
                                        priority={bug.priority}
                                        author={bug.author}
                                        status={bug.status}
                                        tag={bug.tag}
                                        lastUpdate={bug.lastUpdate}
                                        key={key}
                                        
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
                                        project={project}
                                        projectTitle={project.projectTitle}
                                        projectId={projectId}
                                        bugId={bug._id}
                                        title={bug.title}
                                        thumbnail={bug.thumbnail}
                                        description={bug.description}
                                        priority={bug.priority}
                                        author={bug.author}
                                        status={bug.status}
                                        tag={bug.tag}
                                        lastUpdate={bug.lastUpdate}
                                        key={key}
                                        
                                    />
                                )
                            })
                        }
                    </div>
                </>
            }
        </StyledBugTable>
    )
}

const StyledBugTable = styled.div`
    display: grid;
    grid-template-columns: 350px 350px 350px 350px;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    height: 100%;
    max-height: 93vh;
    width: 100%;
    margin-top: 7vh;
    position: relative;
    @media (max-width: 1440px){
        grid-template-columns: 275px 275px 275px 275px;
        width: 100%;
    }
    @media (max-width: 834px){
        width: 100%;
        grid-template-columns: 310px 310px 310px 310px;
    }
    @media (max-width: 428px){
        grid-template-columns: 310px 310px 310px 310px;
        width: 85vw;
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
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SprintBugTable);