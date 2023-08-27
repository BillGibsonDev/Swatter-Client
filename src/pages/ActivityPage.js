import { useState, useEffect } from "react";

// styled
import styled from "styled-components";

// router
import { useParams } from "react-router-dom";

// loaders
import Loader from "../loaders/Loader.js";

// components
import BreadCrumbs from "../components/Breadcrumbs.js";

// functions
import { handleDate } from "../functions/handleDates";
import { getProject } from "../functions/getProject.js";

// redux
import { connect } from "react-redux";

const ProjectActivityPage = ({ user }) => {
  const { projectId } = useParams();

  const [ project, setProject ] = useState({});
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
  }, [ projectId, user ]);

  if( isLoading ){
    return <Loader />
  }

  return (
    <StyledPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={project.title}
        title={'Activity'}
      />
      {
        !project.activities
        ? <h1>This project has no activity yet..</h1>
        : <>
          {
            project.activities.map((activity, key) => {
              return (
                <div className="activity-container" key={key}>
                  <h6>{handleDate(activity.date)}</h6>
                  <h5><span>{activity.user} </span>{activity.activity}</h5>
                </div>
              )
            })
          }
        </>
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  width: 80%;
  margin: auto;
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProjectActivityPage);