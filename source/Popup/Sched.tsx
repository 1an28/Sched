import React from "react";
import List, {ListItem, ListItemText, ListItemGraphic} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

import '@material/react-list/dist/list.css';
import '@material/react-icon-button/dist/icon-button.css';


const Sched: React.FC = () => {

    const listItemCss: React.CSSProperties = {
        display: "flex",
        justifyContent: "space-between"

    }

    return (
        <List>
            <ListItem style = {listItemCss}>
                <ListItemText primaryText='A'/>
                <IconButton>
                    <ListItemGraphic graphic={<MaterialIcon icon='remove_circle_outline'/>}/>
                </IconButton>
            </ListItem>
            <ListItem>
                <ListItemText primaryText='B'/>
            </ListItem>
            <ListItem>
                <ListItemText primaryText='C'/>
            </ListItem>
        </List>
    );
};

export default Sched;