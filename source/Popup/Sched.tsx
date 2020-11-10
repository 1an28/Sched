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

    return (
        <List>
            {
                props.tasks.map((task, index) => {
                    return(
                        <ListItem style = {listItemCss}>
                            <ListItemText primaryText={ task.beginTime.getHours() + ":" + task.beginTime.getMinutes() + "-" + task.endTime.getHours() + ":" + task.endTime.getMinutes() }/>
                            <IconButton onClick = {() => props.deleteTask(index)} >
                                <ListItemGraphic graphic={<MaterialIcon icon='remove_circle_outline'/>}/>
                            </IconButton>
                        </ListItem>
                    );
                })
            }
        </List>
    );
};

export default Sched;