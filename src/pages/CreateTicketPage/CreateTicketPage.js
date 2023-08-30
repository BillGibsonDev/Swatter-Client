import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from "../../styled/ThemeVariables.js";

// router
import { useParams } from "react-router-dom";

// components
import Loader from "../../loaders/Loader.js";
import { Selector } from './components/Selector.js';
import BreadCrumbs from '../../components/Breadcrumbs.js';
import { DescriptionBox } from './components/DescriptionBox.js';
import { Images } from './components/Images.js';
import ButtonContainer from './components/ButtonContainer.js';

// redux
import { connect } from "react-redux";
import { showAlert } from "../../redux/actions/alert.js";

// functions
import { getProject } from '../../functions/getProject.js';

const CreateTicketPage = ({ user, showAlert }) => {
  const { projectId } = useParams();

  const [ title, setTitle ] = useState("");
  const [ status, setStatus ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ priority, setPriority ] = useState("");
  const [ tag, setTag ] = useState("");
  const [ isLoading, setLoading ] = useState(false);
  const [ sprint, setSprint ] = useState("");
  const [ sprintOptions, setSprintOptions ] = useState([]);
  const [ project, setProject ] = useState({});
  const [ images, setImages ] = useState([]);
  const [ assigned, setAssigned ] = useState('');

  const sections = [ 'Status', 'Tag', 'Priority', 'Sprint', 'Assigned User' ];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(user, projectId);
        setProject(projectData);
        setSprintOptions(projectData.sprints)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [ user, projectId ]);

  const handleAlert = ( message, type ) => {
    showAlert(message, type);
  }

  const createTicket = () => {
    if(!title){ handleAlert('Title', 'warning'); return; }; 
    if(!status){ handleAlert('Status', 'warning'); return; }; 
    if(!tag){ handleAlert('Tag', 'warning'); return; }; 
    if(!priority){ handleAlert('Priority', 'warning'); return; }; 
    if(!description){ handleAlert('Description', 'warning'); return; }; 
    setLoading(true);
    let checkImages = images.filter(image => image.image !== '');
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/create`,
      {
        title,
        description,
        status,
        priority,
        assigned,
        tag,
        sprint,
        checkImages,
        author: user.username
      },
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if(response.status === 200) {
        setLoading(false);
        handleAlert('Ticket created', 'success');
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      handleAlert(error, 'error');
    })
  };

  return (
    <StyledPage>
      <BreadCrumbs
        projectId={projectId}
        projectTitle={project.title}
        title={'Create Ticket'}
      />
      <h1>Create Ticket</h1>
      {
        isLoading ? <Loader />
        : <div className='form-wrapper'>
          <label>
            Title
            <input type='text' id='title' onChange={(event) => { setTitle(event.target.value); }} />
          </label>
          {
            sections.map((section, key) =>{
              return (
                <Selector
                  key={key}
                  label={section}
                  setTag={setTag}
                  setPriority={setPriority}
                  setStatus={setStatus}
                  setSprint={setSprint}
                  setAssigned={setAssigned}
                  sprintOptions={sprintOptions}
                  project={project}
                />
              )
            })
          }
          <DescriptionBox
            setDescription={setDescription}
          />
          <Images
            images={images}
            setImages={setImages}
          />
          <ButtonContainer 
            createTicket={createTicket}
          />
        </div>
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 96vh;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  h1 {
    color: white;
    font-size: 2em;
    margin: 10px 0;
  }
  .form-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    label {
      display: flex;
      color: white;
      flex-direction: column;
      margin: 10px 0;
      font-size: ${palette.labelSize};
      width: 100%;
      max-width: 500px;
      font-size: 1em;
      margin: 10px 0;
      }
      input, select {
        width: 100%;
        height: 30px;
        padding: 2px;
        background: ${palette.helperGrey};
      }
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicketPage);