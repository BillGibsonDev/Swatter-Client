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
import TicketPageLoader from "../../../../loaders/TicketPageLoader.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { Selector } from "./components/Selector.js";
import { Images } from "./components/Images.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// router
import { useNavigate, useParams } from "react-router-dom";

const EditTicketPage = ({ user, setEditing }) => {

  const DeleteAlertRef = useRef();

  const navigate = useNavigate();

  const { projectId, ticketId } = useParams();

  const [ ticket, setTicket ] = useState([]);
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
    const getSprints = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}`, 
      {
        headers: {
          Authorization: user.token
        }
      })
      .then((response) => {
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    };
    getSprints();
    getTicket();
  }, [ projectId, ticketId, isLoading, rerender, user ]);

  const updateTicket = () => {
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
        ticket: ticket
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

  const deleteTicket = () => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}`, {},  
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

  const sections = [ 'Tag', 'Priority', 'Status', 'Sprint' ];

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
            <div className='title-container'>
              <h1>{ticket.title}</h1>
              <button id="toggle-edit-button" onClick={() => { setEditing(false)}}><img src={EditIcon} alt='edit' /></button>
            </div>
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
        updateTicket={updateTicket} 
        rerender={rerender}
        setRerender={setRerender}
      />
    </StyledTicketSection>
  );
}

const StyledTicketSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 20px auto;
  @media (max-width: 450px) {
    margin: 0 auto;
  }
  .ticket-container {
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

export default connect(mapStateToProps)(EditTicketPage);