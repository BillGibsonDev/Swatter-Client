import { useEffect, useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// loaders
import TicketPageLoader from "../../loaders/TicketPageLoader.js";

// router
import { useParams } from "react-router-dom";

// components
import BreadCrumbs from "../../components/Breadcrumbs.js";

// redux
import { connect } from "react-redux";

// sections
import TicketPage from "./sections/TicketPage/TicketPage.js";
import EditTicketPage from "./sections/EditTicketPage/EditTicketPage.js";

const MainTicketPage = ({ user }) => {
  const { projectId, ticketId } = useParams();
  const [ ticket, setTicket ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    const getTicket = (projectId, ticketId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/tickets/${ticketId}`, {
        headers: {
          Authorization: user.token,
        }
      })
      .then((response) => {
        setTicket(response.data);
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getTicket(projectId, ticketId);
  }, [ projectId, ticketId, isLoading, editing, user ]);

  return (
    <StyledPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={"Project"} 
        title={ticket.title}
      />
      {
        isLoading ? <TicketPageLoader />
        : !editing ? <TicketPage 
          setEditing={setEditing} 
          editing={editing}
          ticket={ticket} 
          images={images}
          ticketId={ticketId}
          projectId={projectId}
          setLoading={setLoading}
        /> 
        : <EditTicketPage 
            setEditing={setEditing} 
            editing={editing}
            ticket={ticket}
            ticketId={ticketId}
            projectId={projectId}
            user={user}
          />
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  max-height: 80vh;
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainTicketPage);