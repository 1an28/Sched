import React, { useState } from 'react';
import Clock from "./Clock";
import Calendar from "./Calendar";
import './style.css';
import {useTasks} from "./useTasks";

import {AppBar, Tabs, Tab, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    }
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
            <AppBar position="static" >
                <Tabs value={value} centered onChange={handleChange} aria-label="simple tabs example">
                    <Tab className={classes.tab} label="Clock" id = "tab-0" aria-controls = "tabpanel-0"/>
                    <Tab className={classes.tab} label="Calendar" id = "tab-1" aria-controls = "tabpanel-1"/>
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <Clock tasks = {tasks} deleteTask = {deleteTask} displayTasks = {displayTasks} setDisplayTasks = {setDisplayTasks}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={scheduleHandleClick}>
                    BUTTON
                </Button>
                <Calendar />
            </TabPanel>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={scheduleHandleClose}>
                <MenuItem onClick={scheduleHandleClose}>Profile</MenuItem>
                <MenuItem onClick={scheduleHandleClose}>My account</MenuItem>
                <MenuItem onClick={scheduleHandleClose}>Logout</MenuItem>
            </Menu>
        </section>
    );
};

export default Popup;