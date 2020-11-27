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
    const [displayTasks, setDisplayTasks] = useState<Task[]>([]);

    useEffect(() => {
        tasks.sort((a, b) => a.beginTime.getTime() - b.beginTime.getTime());
        localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]
    });

    const addTask = ( addItem: Task ) => {
        if ( addItem.beginTime > addItem.endTime ) {
	        alert("Please set endTime after beginTime.");
        } else if ( (addItem.endTime.getTime() - addItem.beginTime.getTime()) / 3600000 > 12 ) {
            alert("Please set 12 hours or less.");
        } else {
	        setTasks([...tasks, addItem]);
        };
    } 

    const deleteTask = ( index: number ) => {
        tasks.splice(index, 1);
        setTasks([...tasks]);
    };

    return {tasks, addTask, deleteTask, displayTasks, setDisplayTasks};
};