import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// router
import { useParams } from "react-router-dom";

// loaders
import Loader from "../loaders/Loader.js";

// components
import { BreadCrumbs } from "../components/Breadcrumbs.js";

// functions
import { handleDate } from "../functions/handleDates";

export default function ProjectActivityPage() {
  const { projectId } = useParams();

  const [ project, setProject ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);

  useEffect(() => {
    const getProject = () => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getProject(projectId);
  }, [ projectId ]);

  return (
    <StyledActivity>
      {
        isLoading ? <Loader />
       : 
        <>
          <BreadCrumbs 
            projectId={projectId}
            projectTitle={project.projectTitle}
            title={'Activity'}
          />
          {
            !project.activity 
            ? <h1>This project has no activity yet..</h1>
            : <>
                {
                    project.activity.map((activity, key) => {
                        return (
                            <div className="activity-container" key={key}>
                                <h6>{handleDate(activity.date)}</h6>
                                <h5>{activity.action}</h5>
                            </div>
                        )
                    })
                }
            </>
          }
        </>
      }
    </StyledActivity>
  );
}

const StyledActivity = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
    padding: 0;
    margin: 20px 5% 0 15%;
  }
  .activity-container {
    margin-bottom: 8px;
    h6 {
        color: #c5c5c5;
    }
    h5 {
        color: white;
    }
  }
`;