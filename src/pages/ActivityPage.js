import { useState, useEffect } from "react";

// styled
import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// router
import { useParams } from "react-router-dom";

// loaders
import Loader from "../loaders/Loader.js";

// components
import BreadCrumbs from "../components/Breadcrumbs.js";
import { TitleContainer } from "../components/TitleContainer.js";

// functions
import { handleActivityDate } from "../functions/handleDates";
import { getProject } from "../functions/getProject.js";

// redux
import { connect } from "react-redux";
import { StyledButton } from "../styled/StyledButton.js";

const ProjectActivityPage = ({ user }) => {
  const { projectId } = useParams();

  const [ project, setProject ] = useState({});
  const [ isLoading, setLoading ] = useState(true);
  const [ activities, setActivities ] = useState([]);
  const [ showMore, setShowMore ] = useState(3)

  const handleDataSort = (data) => {
    const groupedData = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    data.forEach(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);

      let activityDateString = activityDate.toLocaleDateString();

      if (today.getTime() === activityDate.getTime()) {
        activityDateString = 'Today';
      }

      if (!groupedData[activityDateString]) {
        groupedData[activityDateString] = {
          date: activityDateString,
          activities: []
        };
      }
      
      groupedData[activityDateString].activities.push(activity);
    });

    const groupedArray = Object.values(groupedData);
    return groupedArray;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject( user, projectId );
        setProject(projectData);
        setActivities(handleDataSort(projectData.activities))
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
      <TitleContainer 
        title={`${project.title} Activity`}
        samePage={false}
      />
      {
        activities.length === 0 
        ? <h2>This project has no activity yet..</h2>
        : <>
          {
            activities.slice(0, showMore).map((activity, index) => {
              return (
                <div className="activity-container" key={index}>
                  <h2>{activity.date}</h2>
                  {
                    activity.activities.map((activity, index) => {
                      return (
                        <div className="activity-info-container" key={index}>
                          <h6>{ handleActivityDate(activity.date)}</h6>
                          <h5><span>{activity.user} </span>{activity.activity}</h5>
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
          {
            activities.length <= showMore ? <></>
            : activities.length > 3 ? <StyledButton onClick={() => setShowMore(showMore + 3)}>Show More</StyledButton>
            : <></>
          }
        </>
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  width: 80%;
  margin: 10px auto;
  h2 {
    color: ${palette.accentColor};
  }
  .activity-container {
    margin: 10px 0;
    .activity-info-container {
      margin-top: 8px;
      h6 {
        color: #c5c5c5;
      }
      h5 {
        color: white;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProjectActivityPage);