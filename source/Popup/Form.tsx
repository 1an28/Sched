import React, { useEffect, useState } from "react";
//import {browser} from 'webextension-polyfill-ts';

type Task = {
    beginTime: string,
    endTime: string
};

const Form: React.FC = () => {
    const [beginTime, setBeginTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        const item = localStorage.getItem("tasks");
        if (item) {
            console.log(item);
            const tasksItem: Task[] = JSON.parse(item);
            tasksItem.forEach(task => {
                setTasks((tasks) => {
                    return tasks.concat(task);
                });
            });
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
        setBeginTime( event.currentTarget.value );
    };

    const EndHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setEndTime( event.currentTarget.value );
    };

    return(
        <form onSubmit = {handleSubmit}>
            <ul>
            {
                tasks.map(task => {
                    return(
                        <li> {task.beginTime} / {task.endTime} </li>
                    );
                })
            }
            </ul>

            <input type = "time" onChange = {BeginHandleChange} />
            <input type = "time" onChange = {EndHandleChange} />
            <input type = "submit" />
        </form>
    );
};

export default Form;