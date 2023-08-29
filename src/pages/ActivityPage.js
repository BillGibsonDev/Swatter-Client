import { useState, useEffect } from "react";

// styled
import styled from "styled-components";

// router
import { useParams } from "react-router-dom";

// loaders
import Loader from "../loaders/Loader.js";

// components
import BreadCrumbs from "../components/Breadcrumbs.js";
import { TitleContainer }from '../components/TitleContainer.js';

// functions
import { handleDate, handleActivityDate } from "../functions/handleDates";
import { getProject } from "../functions/getProject.js";

// redux
import { connect } from "react-redux";

const ProjectActivityPage = ({ user }) => {
  const { projectId } = useParams();

  const [ project, setProject ] = useState({});
  const [ isLoading, setLoading ] = useState(true);
  const [ activities, setActivities ] = useState([]);

    const handleDataSort = (data) => {
    const groupedData = {};
    data.forEach(activity => {
      let activityDate = new Date(activity.date).toISOString().split("T")[0];
      const today = new Date(activity.date).toISOString().split("T")[0];

      if(today === activityDate){ activityDate = 'Today'}
      if (!groupedData[activityDate]) {
        groupedData[activityDate] = {
          date: activityDate,
          activities: []
        };
      }
      
      groupedData[activityDate].activities.push(activity);
    });
    const groupedArray = Object.values(groupedData);

    return groupedArray;
  }

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

  console.log(activities)

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
        !activities
        ? <h1>This project has no activity yet..</h1>
        : <>
          {
            activities.map((activity, key) => {
              return (
                <div className="activity-container" key={key}>
                  <TitleContainer title={activity.date === 'Today' ? activity.date : handleDate(activity.date)}/>
                  {
                    activity.activities.map((activity, key) => {
                      return (
                        <div className="activity-info-container" key={key}>
                          <h6>{ handleActivityDate(activity.date)}</h6>
                          <h5 key={key}><span>{activity.user} </span>{activity.activity}</h5>
                        </div>
                      )
                    })
                  }
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
  margin: 10px auto;
  .activity-container {
    margin-bottom: 8px;
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