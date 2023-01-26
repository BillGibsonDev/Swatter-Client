// styled
import styled from 'styled-components';
import * as palette from '../../../styled/ThemeVariables';

// components
import { Bug } from './Bug.js';

export default function BugTable({ project }) {

    const bugStatuses = ['Open', 'Underway', 'Reviewing', 'Completed'];

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
                                    <h5>{status} <span>{project.bugs.filter(bug => bug.status === status).slice().reverse().length}</span></h5>
                                    {
                                       project.bugs.filter(bug => bug.status === status).slice().reverse().map((bug, index) => {
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
    margin-top: 7vh;
    position: relative;
    @media (max-width: 1440px){
        grid-template-columns: 275px 275px 275px 275px;
    }
    @media (max-width: 834px){
        grid-template-columns: 310px 310px 310px 310px;
    }
    @media (max-width: 428px){
        grid-template-columns: 310px 310px 310px 310px;
        width: 85vw;
    }
    .bugs-container {
        width: 100%;
        background: black;
        padding: 6px;
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
                border: 1px #ffffff63 solid;
            }
        }
    }
`;