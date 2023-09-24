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
import { Images } from "../../../../components/Images.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";
import { TitleContainer } from "../../../../components/TitleContainer.js";

// router
import { useNavigate } from "react-router-dom";

const EditTicketPage = ({ user, ticket, showAlert, editing, setEditing, projectId, ticketId }) => {

  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const [ project, setProject ] = useState({});
  const [ isLoading, setLoading ] = useState(true);
  const [ sprintOptions, setSprintOptions ] = useState([]);
  const [ images, setImages ] = useState(ticket.images);
  const [ status, setStatus ] = useState(ticket.status);
  const [ description, setDescription ] = useState(ticket.description);
  const [ priority, setPriority ] = useState(ticket.priority);
  const [ tag, setTag ] = useState(ticket.tag);
  const [ sprint, setSprint ] = useState(ticket.sprint);
  const [ assigned, setAssigned ] = useState(ticket.assigned);
  const [ link, setLink ] = useState(ticket.link);

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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getSprints();
  }, [ projectId, ticketId, user ]);

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
          images: images,
          link: link
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

  if(isLoading){
    return <TicketPageLoader />
  }

  return (
    <StyledTicketSection>
      <DeleteAlert
        handleDeleteAlert={handleDeleteAlert}
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteTicket}
        title={ticket.title}
      />
      <div className='ticket-container'>
        <TitleContainer title={ticket.title} stateChanger={setEditing} state={editing} type={'edit'} />
        <div className='info-wrapper'>
          <InfoContainer ticket={ticket} setLink={setLink} />
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
                        status={status}
                        priority={priority}
                        assigned={assigned}
                        tag={tag}
                        sprint={sprint}
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
          description={ticket.description}
        />
      </div>
      <Images 
        setImages={setImages} 
        images={images} 
        editing={true}
      />
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