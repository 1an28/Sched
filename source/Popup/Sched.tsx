import React from "react";
import List, {ListItem, ListItemText} from '@material/react-list';

import '@material/react-list/dist/list.css';

const Sched: React.FC = () => {
    return (
        <List>
            <ListItem>
            <   ListItemText primaryText='Photos'/>
            </ListItem>
            <ListItem>
                <ListItemText primaryText='Recipes'/>
            </ListItem>
            <ListItem>
                <ListItemText primaryText='Work'/>
            </ListItem>
        </List>
    );
};

export default Sched;