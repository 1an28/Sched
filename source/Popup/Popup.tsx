import React, { useState } from 'react';
import Clock from "./Clock";
import Form from "./Form";
import Sched from "./Sched";
import './style.css';
import {useTasks} from "./useTasks";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
            <Box p={2}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

const Popup: React.FC = () => {

    const {tasks, addTask, deleteTask} = useTasks();
    const [value, setValue] = useState(0);
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        console.log(event);
        setValue(newValue);
    };
    return (
        <section id="popup">
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Clock" id = "tab-0" aria-controls = "tabpanel-0"/>
                    <Tab label="Tasks List" id = "tab-1" aria-controls = "tabpanel-1"/>
                    <Tab label="add Task form" id = "tab-2" aria-controls = "tabpanel-2"/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Clock tasks = {tasks} deleteTask = {deleteTask}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Sched tasks = {tasks} deleteTask = {deleteTask}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Form addTask = {addTask}/>
            </TabPanel>
        </section>
    );
};

export default Popup;