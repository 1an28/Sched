import React, { useEffect, useState } from "react";

type Props = {
    date: Date;
};

type Task = {
    beginTime: TimeItem,
    endTime: TimeItem
};

type TimeItem = {
    hour: number,
    minute: number
};

const ClockFrame: React.FC = () => { // pannel    
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <circle cx = "0" cy = "0" r = "435" fill = "none" stroke = "black" strokeWidth = "10"/>
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
            <polygon points = "-8,-440 8,-440 5,-250 -5,-250" fill = "#888" transform = { "rotate(" + degreeMinutes + ")" } display = "none"/>
            <polygon points = "-10,-440 10,-440 10,-180 -10,-180" fill = "black" transform = { "rotate(" + degreeHours + ")" } display = "none"/>
            <polygon points = "-5,-440 5,-440 3,-250 -3,-250" fill = "#CCC" transform = { "rotate(" + degreeSeconds + ")" } display = "none"/>
            <path
              id = "task"
              stroke = "black"
              d = {
                "M -10 -430 " +
                "L 10 -430 " +
                "L 10 -180 " +
                "L -10 -180 " +
                "L -10 -430"
              }
              transform = { "rotate(" + degreeHours + ")" }
              fill="black"
            />
        </svg>
    );  
};

const DigitalClock: React.FC<Props> = ( props ) => {
    const fontStyle: React.CSSProperties = {
        fontFamily: "Century Gothic",
        letterSpacing: "10px"
    };
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <text style = {fontStyle} fontSize = "70" textAnchor = "middle" dominantBaseline = "central"> {props.date.getHours() + ":" + props.date.getMinutes()} </text>
        </svg>
    );
};

const SchedObject: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    //The clock's radius is 440.
    //const [schedThick, setSchedThick] = useState(0);
    const schedThick = 350;
    
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

    const timeToDegree = (timeItem: TimeItem) => {
        return (((timeItem.hour * (360 / 12)) + (timeItem.minute * ((360 / 12) / 60))) / 180);
    };

    const checkFlag = (task: Task) => {
        let long = task.endTime.hour + task.endTime.minute / 60 - task.beginTime.hour - task.beginTime.minute / 60;

        if (long < 0) {
            long += 24;
        }
        
        if (long < 6) {
            return 0;
        } else {
            return 1;
        }
    }
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            {
                tasks.map((task, index) => {
                    return(
                        <path
                          id = {"task" + index }
                          stroke = "black"
                          d = {
                            "M " + 
                            (Math.cos(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * schedThick) + " " +
                            (Math.sin(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * schedThick) + " " +
                            "L " +
                            (Math.cos(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * 440) + " " +
                            (Math.sin(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * 440) + " " +
                            "A 440 440 0 " + checkFlag(task) + " 1 " +
                            (Math.cos(Math.PI * (timeToDegree(task.endTime) - 0.5)) * 440) + " " +
                            (Math.sin(Math.PI * (timeToDegree(task.endTime) - 0.5)) * 440) + " " +
                            "L" +
                            (Math.cos(Math.PI * (timeToDegree(task.endTime) - 0.5)) * schedThick) + " " +
                            (Math.sin(Math.PI * (timeToDegree(task.endTime) - 0.5)) * schedThick) + " " +
                            "A " + schedThick + " " + schedThick + " 0 " + checkFlag(task) + " 0 " +
                            (Math.cos(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * schedThick) + " " +
                            (Math.sin(Math.PI * (timeToDegree(task.beginTime) - 0.5)) * schedThick)
                          }
                          fill="red"
                        />
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
            <DigitalClock date = {targetDate}/>
            <SchedObject />
            <ClockHands date = {targetDate}/>
            <ClockFrame />
        </section>
    );
};

const Clock: React.FC = () => {
    return (
        <ClockApplication />
    );
};

export default Clock;