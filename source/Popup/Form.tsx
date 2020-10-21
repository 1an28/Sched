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
        setBeginTime( event.currentTarget.value );
    };

    const EndHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setEndTime( event.currentTarget.value );
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
                                <p> {task.beginTime} - {task.endTime} : {index} </p>
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