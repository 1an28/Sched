import React, { useState } from "react";

type Task = Partial<{
    beginTime: String,
    endTime: String
}>;

const Form: React.FC = () => {
    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        const addTask: Task = {};
        addTask.beginTime = beginTime;
        addTask.endTime = endTime;
        setTask(addTask);
        event.preventDefault();
    };

    const [beginTime, setBeginTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [task, setTask] = useState<Task>();
    
    const BeginHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setBeginTime( event.currentTarget.value );
    };
    const EndHandleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setEndTime( event.currentTarget.value )
    };
    
    return(
        <form onSubmit = {handleSubmit}>
            <ul>
                <li>{task?.beginTime}</li>
                <li>{task?.endTime}</li>
            </ul>
            <input type = "time" onChange = {BeginHandleChange} />
            <input type = "time" onChange = {EndHandleChange} />
            <input type = "submit" />
        </form>
    );
};

export default Form;