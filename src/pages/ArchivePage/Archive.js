import { useEffect, useState } from "react";

// styled
import styled from "styled-components";

// components
import ArchiveTicketTable from "./components/ArchiveTicketTable.js";
import BreadCrumbs from '../../components/Breadcrumbs.js';

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

// functions
import { getProject } from "../../functions/getProject.js";

const ArchivePage = ({ user }) => {

    const { projectId } = useParams();

    const [ project, setProject ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
        try {
            const projectData = await getProject( user, projectId );
            setProject(projectData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
        };
        fetchProject();
    }, [projectId, user ]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <StyledArchive>
            <BreadCrumbs 
                projectId={projectId}
                projectTitle={project.title}
                title={'Archive'}
            />
            <h1>{project.title}'s Archive</h1>
            <ArchiveTicketTable
                project={project}
                tickets={project.tickets}
            />
        </StyledArchive>
    )
}

const StyledArchive = styled.section`
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 10px auto 0 auto;
    h1 {
      color: white;
      font-size: 1.5em;
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ArchivePage);