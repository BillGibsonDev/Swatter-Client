import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// functions
import { handleAlert } from "../../functions/handleAlert.js";
import { handleDeleteAlert } from "../../functions/handleDeleteAlert.js";

// components
import BugPageLoader from "../../loaders/BugPageLoader.js";
import { DeleteAlert } from "../../components/DeleteAlert.js";
import { Alert } from '../../components/Alert.js';
import { BreadCrumbs } from "../../components/Breadcrumbs.js";
import { Selector } from "./components/Selector.js";
import { Images } from "./components/Images.js";
import ButtonContainer from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// router
import { useNavigate, useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

const EditBugPage = ({ user }) => {

  const AlertRef = useRef();
  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const { projectId, bugId } = useParams();

  const [ message, setMessage ] = useState('');
  const [ bug, setBug ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ sprintOptions, setSprintOptions ] = useState([]);
  const [ images, setImages ] = useState([]);
  const [ rerender, setRerender ] = useState(true);
  const [ status, setStatus ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ priority, setPriority ] = useState('');
  const [ tag, setTag ] = useState('');
  const [ sprint, setSprint ] = useState('');

  useEffect(() => {
    const getSprints = (projectId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
      .then((response) => {
        setSprintOptions(response.data.sprints);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setBug(response.data.bugs[0]);
        setImages(response.data.bugs[0].images);
        setStatus(response.data.bugs[0].status);
        setDescription(response.data.bugs[0].description);
        setPriority(response.data.bugs[0].priority);
        setTag(response.data.bugs[0].tag);
        setSprint(response.data.bugs[0].sprint);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getSprints(projectId);
    getBug(projectId, bugId);
  }, [projectId, bugId, isLoading, rerender]);

  const updateBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_UPDATE_BUG_URL}/${projectId}/${bugId}`,
      {
        description: description,
        status: status,
        tag: tag,
        priority: priority,
        projectId: projectId,
        bugId: bug._id,
        sprint: sprint,
        images: images,
      }
    )
    .then((response) => {
      if (response.data !== "Bug Updated") {
        setMessage(`Server Error - Bug Not Updated!`);
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`Bug updated!`);
        setLoading(false);
        handleAlert(AlertRef);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage(`Server Error - Bug Not Updated!`);
      setLoading(false);
      handleAlert(AlertRef);
    })
  };

  const deleteBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`)
    .then((response) => {
      if (response.data !== "Bug Deleted") {
        setMessage(`Server Error - Bug Not Deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
      } else {
        setMessage(`Bug Deleted!`);
        setLoading(false);
        handleAlert(AlertRef);
        navigate(`/projects/${projectId}`);
      }
    })
    .catch((err) => {
      console.log(err);
      setMessage(`Server Error - Bug Not Deleted!`);
      setLoading(false);
      handleAlert(AlertRef);
    })
  };

  const sections = [ 'Tag', 'Priority', 'Status', 'Sprint' ];

  return (
    <StyledBugSection>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteBug}
        title={bug.title}
      />
      <BreadCrumbs
        projectId={projectId}
        title={bug.title}
        projectTitle={'Project'}
      />
      {
        isLoading ? <BugPageLoader />
        : 
          <div className='bug-container'>
            <h1>{bug.title}</h1>
            <div className='info-wrapper'>
              <InfoContainer bug={bug} />
              <div className='selector-container'>
                {
                  !tag || !sprintOptions ? <></>
                  : <>
                    {
                      sections.map((section, key) =>{
                        return (
                          <Selector
                            key={key}
                            label={section}
                            tag={tag}
                            sprint={sprint}
                            status={status}
                            priority={priority}
                            setTag={setTag}
                            setPriority={setPriority}
                            setStatus={setStatus}
                            setSprint={setSprint}
                            sprintOptions={sprintOptions}
                          />
                        )
                      })
                    }
                  </>
                }
              </div>
            </div>
            <DescriptionBox
              setDescription={setDescription}
              description={description}
            />
          </div>
      }
      <Images setImages={setImages} images={images} />
      <ButtonContainer 
        DeleteAlertRef={DeleteAlertRef} 
        updateBug={updateBug} 
        rerender={rerender}
        setRerender={setRerender}
      />
    </StyledBugSection>
  );
}

const StyledBugSection = styled.section`
  height: 100%;
  width: 70%;
  margin: 30px auto;
  @media (max-width: 834px) {
    width: 100%;
  }
  @media (max-width: 428px) {
    width: 80%;
    margin: 0 0 0 60px;
  }
  .bug-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    h1 {
      color: white;
      font-size: 2.5em;
      margin: 10px 0;
      @media (max-width: 450px) {
        font-size: 1.5em;
      }
    }
    .selector-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
      margin: 10px 0 10px 0;
      @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(EditBugPage);