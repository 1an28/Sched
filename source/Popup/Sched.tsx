import React from "react";
import List, {ListItem, ListItemText, ListItemGraphic} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

import '@material/react-list/dist/list.css';
import '@material/react-icon-button/dist/icon-button.css';

type Props = {
    tasks: Task[];
    deleteTask: (index: number) => void;
}

type Task = {
    beginTime: Date,
    endTime: Date
};

const Sched: React.FC<Props> = ( props ) => {

    const listItemCss: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between"
    }

    const listCss: React.CSSProperties = {
        margin: "20px 0"
    }

    return (
        <div style = {listCss}>
            <List>
                {
                    props.tasks.map((task, index) => {
                        return(
                            <ListItem style = {listItemCss}>
                                <ListItemText secondaryText = "BEGIN" primaryText={task.beginTime.getMonth() + "/" + task.beginTime.getDay() + "_" + task.beginTime.getHours() + ":" + task.beginTime.getMinutes()}/>
                                <ListItemText secondaryText = "END" primaryText={task.endTime.getMonth() + "/" + task.endTime.getDay() + "_" + task.endTime.getHours() + ":" + task.endTime.getMinutes()}/>
                                <IconButton onClick = {() => props.deleteTask(index)} >
                                    <ListItemGraphic graphic={<MaterialIcon icon='remove_circle_outline'/>}/>
                                </IconButton>
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
        
    );
};

export default Sched;