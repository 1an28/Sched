import React, { useEffect, useState } from "react";

type Props = {
    date: Date;
};

type Task = {
    beginTime: string,
    endTime: string
};

const ClockScale: React.FC = () => { // pannel    
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <circle cx="0" cy="0" r="440" fill="black" />
            <circle cx="0" cy="0" r="420" fill="#eee" />
        </svg>
    );
};

const ClockHands: React.FC<Props> = ( props ) => { // hands

    const [degreeSeconds, setDegreeSeconds] = useState(0);
    const [degreeMinutes, setDegreeMinutes] = useState(0);
    const [degreeHours, setDegreeHours] = useState(0);

    useEffect(() => {
        setDegreeSeconds((props.date.getSeconds() * (360 / 60)) + (props.date.getMilliseconds() * (360 / 60) / 1000)); 
        setDegreeMinutes((props.date.getMinutes() * (360 / 60)) + (props.date.getSeconds() * (360 / 60) / 60) + (props.date.getMilliseconds() * ((360 / 60) / 60) / 1000));
        setDegreeHours((props.date.getHours() * (360 / 12)) + (props.date.getMinutes() * ((360 / 12) / 60)) + (props.date.getSeconds() * ((360 / 12) / 60) / 60));
    }, [props.date]);

    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000" >
            <polygon points = "-8,-440 8,-440 5,-250 -5,-250" fill = "#888" transform = { "rotate(" + degreeMinutes + ")" }/>
            <polygon points = "-10,-440 10,-440 5,-300 -5,-300" fill = "#888" transform = { "rotate(" + degreeHours + ")" }/>
            <polygon points = "-5,-440 5,-440 3,-250 -3,-250" fill = "#CCC" transform = { "rotate(" + degreeSeconds + ")" }/>
        </svg>
    );
};

const DigitalClock: React.FC<Props> = ( props ) => {
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <text fontSize = "100" textAnchor = "middle" dominantBaseline = "central"> {props.date.getHours()} : {props.date.getMinutes()} </text>
        </svg>
    );
};

const SchedObject: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const item = localStorage.getItem("tasks");
        if (item) {
            const tasksItem: Task[] = JSON.parse(item);
            setTasks(tasksItem);
        };
    }, []);

    useEffect(() => {
        const item = localStorage.getItem("tasks");
        if (item) {
            const tasksItem: Task[] = JSON.parse(item);
            setTasks(tasksItem);
        };
    }, [localStorage.getItem("tasks")]);    

    const beginTimeToDegree = (beginTime: string) => {
        const result = beginTime.split(":");
        const hour = parseInt(result[0]);
        const minute = parseInt(result[1]);

        return ( hour * (360 / 12)) + ( minute * ((360 / 12) / 60) );
    };

    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            {
                tasks.map((task, index) => {
                    return(
                        <polygon id = { "tasks" + index } points = "-10,-440 10,-440 5,-300 -5,-300" fill = "black" transform = {"rotate(" + beginTimeToDegree(task.beginTime) + ")"} />
                    );
                })
            }
        </svg>
    );
};

const ClockApplication: React.FC = () => { // clock app

    const [now, setNow] = useState(new Date().getTime());
    const [targetDate, setTargetDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date().getTime());
            setTargetDate(new Date(now));
        }, 100);
        return () => clearInterval(timerId);
    });

    const ClockAppStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        paddingBottom: "100%"
    };

    return (
        <section style = {ClockAppStyle}>
            <ClockScale />
            <ClockHands date = {targetDate}/>
            <DigitalClock date = {targetDate}/>
            <SchedObject />
        </section>
    );
};


const Clock: React.FC = () => {
    return (
        <ClockApplication />
    );
};

export default Clock;