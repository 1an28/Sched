import React, { useEffect, useState } from "react";
//import {browser} from 'webextension-polyfill-ts';

type Task = {
    beginTime: TimeItem,
    endTime: TimeItem
};

type TimeItem = {
    hour: number,
    minute: number
};

const Form: React.FC = () => {
    const [beginTime, setBeginTime] = useState<TimeItem>({hour: 0, minute: 0});
    const [endTime, setEndTime] = useState<TimeItem>({hour: 0, minute: 0});
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const item = localStorage.getItem("tasks");
        if (item) {
            const tasksItem: Task[] = JSON.parse(item);
            setTasks(tasksItem);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const addTask: Task = {
            beginTime: beginTime,
            endTime: endTime
        };
        setTasks(tasks.concat(addTask));
    };
    
    const BeginHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const result = event.currentTarget.value;
        const resultSplit = result.split(":");
        const hourItem = parseInt(resultSplit[0]);
        const minuteItem = parseInt(resultSplit[1]);
        setBeginTime({hour: hourItem, minute: minuteItem});
    };

    const EndHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const result = event.currentTarget.value;
        const resultSplit = result.split(":");
        const hourItem = parseInt(resultSplit[0]);
        const minuteItem = parseInt(resultSplit[1]);
        setEndTime({hour: hourItem, minute: minuteItem});
    };

    const handleClick = ( index: number ) => {
        tasks.splice(index, 1);
        setTasks([...tasks]);
    };

    return(
        <section>
            <ul>
                {
                    tasks.map((task, index) => {
                        return(
                            <li>
                                <p> {task.beginTime.hour} : {task.beginTime.minute} - {task.endTime.hour} : {task.endTime.minute} </p>
                                <button onClick = { () => handleClick(index) } > ✕ </button>
                            </li>
                        );
                    })
                }
            </ul>
            <form onSubmit = {handleSubmit}>
                <input type = "time" onChange = {BeginHandleChange} />
                <input type = "time" onChange = {EndHandleChange} />
                <input type = "submit" />
            </form>
        </section>
        
    );
};

export default Form;