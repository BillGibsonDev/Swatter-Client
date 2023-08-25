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
          ticket={ticket} 
          images={images}
          ticketId={ticketId}
          projectId={projectId}
          setLoading={setLoading}
        /> 
        : <EditTicketPage 
            setEditing={setEditing} 
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
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
    padding: 0;
    margin: 0 5% 0 15%;
  }
  #toggle-edit-button {
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainTicketPage);