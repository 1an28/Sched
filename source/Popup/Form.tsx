import React, { useState } from "react";
//import {browser} from 'webextension-polyfill-ts';

type Task = Partial<{
    beginTime: string,
    endTime: string
}>;

const Form: React.FC = () => {
    const [beginTime, setBeginTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [task, setTask] = useState<Task>();
    let taskCount = 0;
    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {

        const addTask: Task = {};
        addTask.beginTime = beginTime;
        addTask.endTime = endTime;
        setTask(addTask);
        event.preventDefault();

        localStorage.setItem( "task" + taskCount.toString(), addTask?.beginTime );
    };
    
    const BeginHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setBeginTime( event.currentTarget.value );
    };
    const EndHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setEndTime( event.currentTarget.value )
    };
    
    return(
        <form onSubmit = {handleSubmit}>
            <ul>
                <li>{localStorage.getItem("task0")}</li>
                <li>{task?.toString()}</li>
            </ul>
            <input type = "time" onChange = {BeginHandleChange} />
            <input type = "time" onChange = {EndHandleChange} />
            <input type = "submit" />
        </form>
    );
};

export default Form;