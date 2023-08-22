import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// images
import EditIcon from "../../../../assets/icons/editIconWhite.png";

// functions
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";

// redux
import { connect } from "react-redux";

// components
import BugPageLoader from "../../../../loaders/BugPageLoader.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { Selector } from "./components/Selector.js";
import { Images } from "./components/Images.js";
import ButtonContainer from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// router
import { useNavigate, useParams } from "react-router-dom";

const EditBugPage = ({ user, setEditing }) => {

  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const { projectId, bugId } = useParams();

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
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`)
      .then((response) => {
        setSprintOptions(response.data.sprints);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/bugs/${bugId}`)
      .then((response) => {
        setBug(response.data);
        setImages(response.data.images);
        setStatus(response.data.status);
        setDescription(response.data.description);
        setPriority(response.data.priority);
        setTag(response.data.tag);
        setSprint(response.data.sprint);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getSprints(projectId);
    getBug(projectId, bugId);
  }, [ projectId, bugId, isLoading, rerender, user ]);

  const updateBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/bugs/${bugId}/update`,
      {
        title: bug.title,
        description: description,
        status: status,
        tag: tag,
        priority: priority,
        projectId: projectId,
        bugId: bug._id,
        bug: bug
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setEditing(false);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  const deleteBug = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`, {},  
      {
        headers: {
          Authorization: user.token
        }
      },
    )
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        navigate(`/projects/${projectId}`);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  const sections = [ 'Tag', 'Priority', 'Status', 'Sprint' ];

  return (
    <StyledBugSection>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteBug}
        title={bug.title}
      />
      {
        isLoading ? <BugPageLoader />
        : 
          <div className='bug-container'>
            <div className='title-container'>
              <h1>{bug.title}</h1>
              <button id="toggle-edit-button" onClick={() => { setEditing(false)}}><img src={EditIcon} alt='edit' /></button>
            </div>
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
  width: 100%;
  margin: 20px auto;
  @media (max-width: 450px) {
    margin: 0 auto;
  }
  .bug-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    .title-container {
      display: flex;
      align-items: center;
      @media (max-width: 450px) {
        justify-content: space-between;
      }
      h1 {
        color: white;
        font-size: 2em;
        margin: 10px 0;
        @media (max-width: 450px) {
          font-size: 1.5em;
        }
      }
      .selector-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 20px;
        width: 100%;
        margin: 10px 0 10px 0;
        @media (max-width: 700px) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
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