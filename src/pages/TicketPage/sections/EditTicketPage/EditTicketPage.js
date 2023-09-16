import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as Yup from 'yup';

// styled
import styled from "styled-components";

// functions
import { handleDeleteAlert } from "../../../../functions/handleDeleteAlert.js";

// redux
import { connect } from "react-redux";
import { showAlert } from "../../../../redux/actions/alert.js";

// components
import TicketPageLoader from "../../../../loaders/TicketPageLoader.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { Selector } from "./components/Selector.js";
import { Images } from "./components/Images.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";
import { TitleContainer } from "../../../../components/TitleContainer.js";

// router
import { useNavigate, useParams } from "react-router-dom";

const EditTicketPage = ({ user, showAlert, editing, setEditing }) => {

  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const { projectId, ticketId } = useParams();

  const [ project, setProject ] = useState({});
  const [ ticket, setTicket ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ sprintOptions, setSprintOptions ] = useState([]);
  const [ images, setImages ] = useState([]);
  const [ status, setStatus ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ priority, setPriority ] = useState('');
  const [ tag, setTag ] = useState('');
  const [ sprint, setSprint ] = useState('');
  const [ assigned, setAssigned ] = useState('');

  useEffect(() => {
    const getSprints = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`, 
      {
        headers: {
          Authorization: user.token
        }
      })
      .then((response) => {
        setProject(response.data);
        setSprintOptions(response.data.sprints);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    const getTicket = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}`, 
      {
        headers: {
          Authorization: user.token
        }
      })
      .then((response) => {
        setTicket(response.data);
        setImages(response.data.images);
        setStatus(response.data.status);
        setDescription(response.data.description);
        setPriority(response.data.priority);
        setTag(response.data.tag);
        setSprint(response.data.sprint);
        setAssigned(response.data.assigned);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getSprints();
    getTicket();
  }, [ projectId, ticketId, isLoading, user ]);

    const validationSchema = Yup.object().shape({
      description: Yup.string()
        .required('A Description is required')
        .max(500, 'Descriptions can not exceed 500 characters')
    });

  const updateTicket = () => {
    validationSchema.validate({ description })
    .then(() => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}/update`,
        {
          title: ticket.title,
          description: description,
          status: status,
          tag: tag,
          priority: priority,
          projectId: projectId,
          ticketId: ticket._id,
          ticket: ticket,
          assigned: assigned,
          sprint: sprint,
        },
        {
          headers: {
            Authorization: user.token
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setTicket(response.data);
          setImages(response.data.images);
          setStatus(response.data.status);
          setDescription(response.data.description);
          setPriority(response.data.priority);
          setTag(response.data.tag);
          setSprint(response.data.sprint);
          setAssigned(response.data.assigned);
          setEditing(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    })
    .catch((validationError) => {
			showAlert(validationError, 'error');
		});
  };

  const deleteTicket = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}/delete`, {},  
      {
        headers: {
          Authorization: user.token
        }
      },
    )
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        navigate(`/${user.id}/projects/${projectId}`);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    })
  };

  const sections = [ 'Tag', 'Priority', 'Status', 'Sprint', 'Assigned User' ];

  return (
    <StyledTicketSection>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteTicket}
        title={ticket.title}
      />
      {
        isLoading ? <TicketPageLoader />
        : 
          <div className='ticket-container'>
            <TitleContainer title={ticket.title} stateChanger={setEditing} state={editing} type={'edit'} />
            <div className='info-wrapper'>
              <InfoContainer ticket={ticket} />
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
                            assigned={assigned}
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
        updateTicket={updateTicket}
      />
    </StyledTicketSection>
  );
}

const StyledTicketSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  .ticket-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTicketPage);