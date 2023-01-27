import { useEffect, useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// components
import ArchiveBugTable from "./components/ArchiveBugTable.js";
import { BreadCrumbs } from '../../components/Breadcrumbs.js';

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";


export default function ArchivePage() {

    const { projectId } = useParams();

    const [ project, setProject ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        const getProject = () => {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
                .then((response) => {
                setProject(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        };
        getProject(projectId);
  }, [ projectId ]);

    return (
        <StyledArchive>
            <BreadCrumbs 
                projectId={projectId}
                projectTitle={project.projectTitle}
                title={'Archive'}
            />
            <h1>{project.projectTitle} Archive</h1>
            { 
                isLoading ? <Loader />
                : <ArchiveBugTable
                    project={project}
                    bugs={project.bugs}
                />
            }
        </StyledArchive>
    )
}

const StyledArchive = styled.section`
    display: flex;
    flex-direction: column;
    width: 90%;
    min-height: 50vh;
    margin: 20px auto;
    @media (max-width: 834px) {
        width: 900px;
        max-width: 85vw;
        margin-left: 70px;
    }
    @media (max-width: 820px) {
        width: 760px;
    }
    @media (max-width: 768px) {
        width: 710px;
    }
    @media (max-width: 428px) {
        width: 360px;
        margin-left: 60px;
    }
    @media (max-width: 414px) {
        width: 340px;
    }
    @media (max-width: 390px) {
        width: 320px;
    }
    @media (max-width: 375px) {
        width: 310px;
    }
    @media (max-width: 360px) {
        width: 295px;
    }
    h1 {
      color: white;
      font-size: 1.5em;
    }
`;