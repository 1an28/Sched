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
        <svg id = "clockFrame" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <circle cx = "0" cy = "0" r = "436.5" fill = "none" stroke = "black" strokeWidth = "13"/>
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
        <svg id = "clockHands" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000" >
            <polygon points = "-8,-440 8,-440 5,-250 -5,-250" fill = "#888" transform = { "rotate(" + degreeMinutes + ")" } display = "none"/>
            <polygon points = "-10,-440 10,-440 10,-180 -10,-180" fill = "black" transform = { "rotate(" + degreeHours + ")" } display = "none"/>
            <polygon points = "-5,-440 5,-440 3,-250 -3,-250" fill = "#CCC" transform = { "rotate(" + degreeSeconds + ")" } display = "none"/>
            <path
              stroke = "black"
              d = {
                "M -30 -430 " +
                "L 30 -430 " +
                "A 20 20 0 0 0 10 -410 " +
                "L 10 -180 " +
                "A 10 10 0 1 1 -10 -180 " +
                "L -10 -410 " +
                "A 20 20 0 0 0 -30 -430"
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
        <svg id = "digitalClock" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <text style = {fontStyle} fontSize = "70" textAnchor = "middle" dominantBaseline = "central"> {props.date.getHours() + ":" + props.date.getMinutes()} </text>
        </svg>
    );
};

const SchedObject: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    //The clock's radius is 430.
    const schedThick = 60;
    //3 minute == 10px

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

    const numberToDegree = (hour: number, minute: number) => {
        return (((hour * (360 / 12)) + (minute * ((360 / 12) / 60))) / 180);
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
        <svg id = "schedObj" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            {
                tasks.map((task, index) => {
                    return(
                        <path
                          id = {"task" + index }
                          d = {
                            "M " + 
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * (430 - schedThick)) + " " +
                            "A 30 30 0 0 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * 430) + " " +
                            "A 440 440 0 " + checkFlag(task) + " 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 8) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 8) - 0.5)) * 430) + " " +
                            "L" +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 8) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 8) - 0.5)) * (430 - schedThick)) + " " +
                            "A " + (430 - schedThick) + " " + (430 - schedThick) + " 0 " + checkFlag(task) + " 0 " +
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.hour, task.beginTime.minute + 10) - 0.5)) * (430 - schedThick)) + " " +

                            "M " + 
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * (430 - schedThick)) + " " +
                            "L " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * 430) + " " +
                            "A 440 440 0 0 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute) - 0.5)) * 430) + " " +
                            "L" +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute) - 0.5)) * (430 - schedThick)) + " " +
                            "A " + (430 - schedThick) + " " + (430 - schedThick) + " 0 0 0 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.hour, task.endTime.minute - 5) - 0.5)) * (430 - schedThick))
                            
                          }
                          fill="#E17477"
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