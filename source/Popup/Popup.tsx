import React, { useState } from 'react';
import Clock from "./Clock";
import Calendar, {exportOnClick, uploadOnSelect} from "./Calendar";
import './style.css';
import {useTasks} from "./useTasks";

import {AppBar, Tabs, Tab, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

type TabPanelProps = {
    children?: React.ReactNode,
    index: number,
    value: number
};

const TabPanel:React.FC<TabPanelProps> = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={"tabpanel-" + index}
          aria-labelledby={"tab-$" + index}
        >
        {value === index && (
            <Box p={1}>
                {children}
            </Box>
        )}
        </div>
    );
}

const useStyles = makeStyles(() => ({
    tab: {
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    settingIcon: {
        color: "white",
        marginLeft: "auto",
        marginRight: 10
    },
}));

const Popup: React.FC = () => {
    const classes = useStyles();

    const {tasks, deleteTask, displayTasks, setDisplayTasks} = useTasks();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const scheduleHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const scheduleHandleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
    };
    return (
        <section id="popup">
            <AppBar position="static">
                <Tabs value={value} centered onChange={handleChange} aria-label="simple tabs example">
                    <Tab className={classes.tab} label="Clock" id = "tab-0" aria-controls = "tabpanel-0"/>
                    <Tab className={classes.tab} label="Calendar" id = "tab-1" aria-controls = "tabpanel-1"/>
                    <IconButton className={classes.settingIcon} aria-controls="simple-menu" aria-haspopup="true" onClick={scheduleHandleClick}>
                        <SettingsIcon />
                    </IconButton>
                </Tabs>
                
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <Clock tasks = {tasks} deleteTask = {deleteTask} displayTasks = {displayTasks} setDisplayTasks = {setDisplayTasks}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Calendar />
            </TabPanel>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={scheduleHandleClose}>
                <MenuItem onClick={scheduleHandleClose}>
                    <button onClick={exportOnClick}>ICSFILE EXPORT</button>
                </MenuItem>
                <MenuItem onClick={scheduleHandleClose}>
                    <input type="file" accept=".ics" onChange={uploadOnSelect}/>
                </MenuItem>
            </Menu>
        </section>
    );
};

export default Popup;