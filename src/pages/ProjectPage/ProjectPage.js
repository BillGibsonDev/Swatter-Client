import { useEffect, useState } from "react";

// styled
import styled from "styled-components";

// icons
import * as icons from '../../assets/IconImports.js';

// components
import TicketTable from "./components/TicketTable.js";
import { Searchbar } from "../../components/Searchbar";
import SearchTicketTable from "./components/SearchTicketTable.js";
import ListTicketTable from "./components/ListTicketTable.js";

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
  const [ listView, setListView ] = useState(true);
  const [ seeAssigned, setSeeAssigned ] = useState(true);
  const [ ticketTimeFrame, setTicketTimeFrame ] = useState(30);

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
        <label>
          <select 
            name="time-frame" 
            id="time-frame" 
            onChange={(e) => setTicketTimeFrame(e.target.value)}
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="All">All</option>
          </select>
        </label>
        <div className="view-button-container">
          <button onClick={() => setListView(true)}><img src={icons.List} alt="List" /></button>
          <button onClick={() => setListView(false)}><img src={icons.Columns} alt="Columns" /></button>
        </div>
      </div>
      {
        ticketSearchPhrase ?
          <SearchTicketTable
            tickets={project.tickets}
            project={project}
            ticketSearchPhrase={ticketSearchPhrase}
            seeAssigned={seeAssigned}
          />
        : listView ?
          <ListTicketTable
            project={project}
            seeAssigned={seeAssigned}
            ticketTimeFrame={ticketTimeFrame}
          />
        : <TicketTable
            project={project}
            seeAssigned={seeAssigned}
            ticketTimeFrame={ticketTimeFrame}
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
    max-width: 750px;
    height: auto;
    flex-wrap: wrap;
    padding: 0 10px;
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
    #time-frame {
      padding: 0 10px;
      cursor: pointer;
    }
    .view-button-container {
      display: flex;
      margin-left: 6px;
      @media (max-width: 800px) {
        margin-top: 10px;
      }
      button {
        width: 24px;
        height: 24px;
        background-color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        margin: 0 2px;
        img {
          width: 90%;
          height: 90%;
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

export default connect(mapStateToProps)(ProjectPage);