import { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from 'yup';

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
import { Images } from '../../components/Images.js';
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

  const validatonImageSchema = Yup.object().shape({
    image: Yup.string(),
    caption: Yup.string()
      .min(3, 'A caption must be at least 3 characters')
      .max(160, 'A caption can not exceed 160 characters')
  })

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(30, 'Title cannot exceed 30 characters'),
    status: Yup.string()
      .required('A Status is required'),
    tag: Yup.string()
      .required('A Tag is required'),
    description: Yup.string()
      .required('A Description is required')
      .max(500, 'Descriptions can not exceed 500 characters'),
    images: Yup.array().of(validatonImageSchema),
  });

  const createTicket = (event) => {
    event.preventDefault();
    validationSchema.validate({ title, status, tag, description })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/create`,
        {
          title,
          description,
          status,
          priority,
          assigned,
          tag,
          sprint,
          images,
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
          showAlert('Ticket created', 'success');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        showAlert(error, 'error');
      })
    })
    .catch((validationError) => {
			showAlert(validationError, 'error');
		});
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledPage>
      <BreadCrumbs
        projectId={projectId}
        projectTitle={project.title}
        title={'Create Ticket'}
      />
      <h1>Create Ticket</h1><div className='form-wrapper'>
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