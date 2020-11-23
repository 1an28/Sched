import { useEffect, useState } from "react";

type Task = {
    beginTime: Date,
    endTime: Date
};

export const useTasks = () => {

    const initialTasks = () => {
        let item = localStorage.getItem("tasks");
        let tasksItem: Task[] = [];
        if (item) {
            const tasksItemA: Task[] = JSON.parse(item);
            const tasksItemB: Task[] = [];
            tasksItemA.forEach(task => tasksItemB.push({beginTime: new Date(task.beginTime) , endTime: new Date(task.endTime)}));
            tasksItem = tasksItemB;
        };
        return tasksItem;
    };
    const [tasks, setTasks] = useState(initialTasks);
    
    useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

    const addTask = ( addItem: Task ) => {
        if ( addItem.beginTime.getTime() < addItem.endTime.getTime() ) {
            setTasks(tasks.concat(addItem));
        } else {
            alert("ERROR");
        };
    } 

    const deleteTask = ( index: number ) => {
        tasks.splice(index, 1);
        setTasks([...tasks]);
    };

    return {tasks, addTask, deleteTask};
};