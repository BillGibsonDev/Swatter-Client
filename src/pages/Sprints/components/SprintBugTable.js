// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// components
import { Bug } from '../../ProjectPage/components/Bug.js';

// redux
import { connect } from 'react-redux';

const SprintBugTable = ({ project, searchSprint }) => {

    const bugStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

    const handleSprintFilter = (status) => {
        let sprintArray = [];
        if (searchSprint){
            sprintArray = project.bugs.filter(bug => bug.status === status).filter(bug => bug.sprint === searchSprint).slice().reverse()
        } else {
            sprintArray = project.bugs.filter(bug => bug.status === status)
        }
        return sprintArray;
    }

    return (
        <StyledBugTable>
            { 
                !project.bugs
                ? <div className="undefined">
                    <h1>You've haven't entered any bugs</h1>
                </div>
                : <>
                    {
                        bugStatuses.map((status, index) => {
                            return (
                                <div className="bugs-container" key={index}>
                                    <h5>{status} <span>{ handleSprintFilter(status).length}</span></h5>
                                    {
                                        handleSprintFilter(status).map((bug, index) => {
                                            return (
                                                <Bug
                                                    bug={bug}
                                                    project={project}
                                                    key={index}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
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
    margin-top: 20px;
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
            color: ${palette.helperGrey};
            padding: 10px;
            font-size: ${palette.paraSize};
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