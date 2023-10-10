import { useEffect, useState } from "react";

// styled
import styled from "styled-components";

// components
import TicketTable from "./components/TicketTable.js";
import { Searchbar } from "../../components/Searchbar";
import SearchTicketTable from "./components/SearchTicketTable.js";

// loaders
import Loader from "../../loaders/Loader";

// router
import { useParams } from "react-router-dom";

// redux
import { connect } from "react-redux";

// functions
import { getProject } from "../../functions/getProject.js";

const ProjectPage = ({ user }) => {

  const { projectId } = useParams();

  const [ project, setProject ] = useState({});
  const [ isLoading, setLoading ] = useState(true);
  const [ ticketSearchPhrase, setTicketSearchPhrase ] = useState('');
  const [ seeAssigned, setSeeAssigned ] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(user, projectId);
        setProject(projectData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [ projectId, user, seeAssigned ]);

  const handleSeeAssignedValue = (checked) => {
    if(checked){
      setSeeAssigned(true);
    } else {
      setSeeAssigned(false);
    }
  }

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledPage>
      <div className="search-container">
        <Searchbar setSearchPhrase={setTicketSearchPhrase} />
        <label>Assigned
          <input type="checkbox" id="assigned" checked={seeAssigned} onChange={(e) => { handleSeeAssignedValue(e.target.checked)}} />
        </label> 
      </div>
      {
        ticketSearchPhrase ?
          <SearchTicketTable
            tickets={project.tickets}
            project={project}
            ticketSearchPhrase={ticketSearchPhrase}
          />
        :
          <TicketTable
            project={project}
            seeAssigned={seeAssigned}
          />
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  width: 90%;
  margin: 10px auto 0 auto;
  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 550px;
    height: auto;
    @media (max-width: 600px) {
      flex-direction: column;
    }
    label {
      display: flex;
      align-items: center;
      color: white;
      @media (max-width: 600px) {
        margin-top: 10px;
      }
      input {
        margin-left: 6px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProjectPage);