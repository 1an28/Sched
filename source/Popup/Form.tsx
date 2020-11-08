import React, { useEffect, useState } from "react";

import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

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

    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
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

    return(
        <MuiPickersUtilsProvider utils = {DateFnsUtils}>
            <form onSubmit = {handleSubmit}>
                <TimePicker autoOk label="12 hours" value={beginTime} onChange={BeginHandleChange}/>
                <TimePicker autoOk label="12 hours" value={endTime} onChange={EndHandleChange}/>
                <input type = "submit" />
            </form>
        </MuiPickersUtilsProvider>
        
    );
};

export default Form;