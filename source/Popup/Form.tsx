import React, { useEffect, useState } from "react";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MaterialIcon from '@material/react-material-icon';
import IconButton from '@material/react-icon-button';

//import {browser} from 'webextension-polyfill-ts';

type Task = {
    beginTime: Date,
    endTime: Date
};

const Form: React.FC = () => {
    const [beginTime, setBeginTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const item = localStorage.getItem("tasks");
        if (item) {
            const tasksItem: Task[] = JSON.parse(item);
            setTasks(tasksItem);
        };
    }, []);

    useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

    const addTask = () => {
        const addTask: Task = {
            beginTime: beginTime,
            endTime: endTime
        };
        setTasks(tasks.concat(addTask));
    };
    
    const BeginHandleChange = ( date: MaterialUiPickersDate ) => {
        if (date) {
            setBeginTime(date);
        };
    };

    const EndHandleChange = ( date: MaterialUiPickersDate ) => {
        if (date) {
            setEndTime(date);
        };
    };

    const formCss: React.CSSProperties = {
        display: "flex",
        justifyContent: "safe center",
    }

    return(
        <div style = {formCss}>
            <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                <TimePicker autoOk value={beginTime} onChange={BeginHandleChange}/>
                <TimePicker autoOk value={endTime} onChange={EndHandleChange}/>
                <IconButton onClick = {addTask}>
                    <MaterialIcon icon='add_task'/>
                </IconButton>
            </MuiPickersUtilsProvider>
        </div>
    );
};

export default Form;