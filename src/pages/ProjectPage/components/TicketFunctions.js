// icons
import * as icons from '../../../assets/IconImports.js';

export const handleSprintColor = (project, ticket) => {
    if(project.sprints){
        let sprintColor = project.sprints.find(sprint => sprint.title === ticket.sprint)
        if(sprintColor){
            let color = sprintColor.color;
            if(color){
                return { background: color, padding: '1px 4px' };
            }
        } else {
            return {};
        }
    }
}

export const handleTicketPriority = (priority) => {
    switch (priority) {
    case "High":
        return icons.ArrowRed;
    default:
        return '';
    };
}

export const handleTimeAppraisal = (appraisal) => {
    if(!appraisal || appraisal === 'Unknown'){
        return 'grey'
    } else if(appraisal === 'Minor'){
        return 'violet'
    } else if(appraisal === 'Moderate'){
        return 'yellow'
    } else if(appraisal === 'Major'){
        return 'red'
    }
}

