import { useRef } from "react";
// styled
import styled from "styled-components";
import * as palette from '../../../../styled/ThemeVariables.js';

// icons
import * as icons from '../../../../assets/IconImports.js';

// components
import { ImageSection } from "./components/ImageSection.js";
import { CommentSection } from "./components/CommentSection.js";
import { ButtonContainer } from "./components/ButtonContainer.js";
import { InfoContainer } from "./components/InfoContainer.js";
import { DeleteAlert } from "../../../../components/DeleteAlert.js";
import { DescriptionBox } from "./components/DescriptionBox.js";

// redux
import { connect } from "react-redux";
import { TitleContainer } from "../../../../components/TitleContainer";
import { DetailsSection } from "./components/DetailsContainer.js";

const TicketPage = ({ ticket, editing, setEditing, ticketId, projectId, user, setLoading }) => {

  const DeleteAlertRef = useRef();

  return (
    <StyledSection>
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
      />
      <TitleContainer title={ticket.title} />
      <DetailsSection ticket={ticket} setEditing={setEditing} />
      <InfoContainer ticket={ticket} />
      <DescriptionBox description={ticket.description} />
      <ButtonContainer images={ticket.images} />
      <ImageSection images={ticket.images} />
      <CommentSection user={user} ticketId={ticketId} projectId={projectId} setLoading={setLoading} />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(TicketPage);