import React, { useEffect, useState } from "react";

type TasksProps = {
    tasks: Task[];
    deleteTask: (index: number) => void;
};

type ClockAppProps = {
    tasks: Task[];
    deleteTask: (index: number) => void;
    displayTasks: Task[];
    setDisplayTasks: (addItem: Task[]) => void;
};

type DateProps = {
    date: Date;
}

type Task = {
    beginTime: Date,
    endTime: Date
};

const ClockFrame: React.FC = () => { // pannel    
    return (
        <svg id = "clockFrame" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <circle cx = "0" cy = "0" r = "436.5" fill = "none" stroke = "black" strokeWidth = "13"/>
        </svg>
    );
};

const ClockHands: React.FC<DateProps> = ( props ) => { // hands

    const initialDegree = (timeType: string) => {
        if (timeType == "sec") {
            return (props.date.getSeconds() * (360 / 60)) + (props.date.getMilliseconds() * (360 / 60) / 1000);
        } else if (timeType == "min") {
            return ((props.date.getMinutes() * (360 / 60)) + (props.date.getSeconds() * (360 / 60) / 60) + (props.date.getMilliseconds() * ((360 / 60) / 60) / 1000));
        } else if (timeType == "hou") {
            return ((props.date.getHours() * (360 / 12)) + (props.date.getMinutes() * ((360 / 12) / 60)) + (props.date.getSeconds() * ((360 / 12) / 60) / 60));
        } else {
            return 0;
        }
    };

    const [degreeSeconds, setDegreeSeconds] = useState(initialDegree("sec"));
    const [degreeMinutes, setDegreeMinutes] = useState(initialDegree("min"));
    const [degreeHours, setDegreeHours] = useState(initialDegree("hou"));

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

const DigitalClock: React.FC<DateProps> = ( props ) => {
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

const SchedObject: React.FC<TasksProps> = (props) => {

    //The clock's radius is 430.
    const schedThick = 60;
    //3 minute == 10px

    const numberToDegree = (hour: number, minute: number) => {
        return (((hour * (360 / 12)) + (minute * ((360 / 12) / 60))) / 180);
    };

    const checkFlag = (task: Task) => {
        const long = (task.endTime.getTime() - task.beginTime.getTime()) / 3600000;
        return ( long < 6 ? 0 : 1 );
    };
        
    return (
        <svg id = "schedObj" width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            {
                props.tasks.map((task, index) => {
                    return(
                        <path
                          key = {index}
                          id = {"task" + index }
                          d = {
                            "M " + 
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +
                            "A 30 30 0 0 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * 430) + " " +
                            "A 430 430 0 " + checkFlag(task) + " 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 8) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 8) - 0.5)) * 430) + " " +
                            "L" +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 8) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 8) - 0.5)) * (430 - schedThick)) + " " +
                            "A " + (430 - schedThick) + " " + (430 - schedThick) + " 0 " + checkFlag(task) + " 0 " +
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +

                            "M " + 
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * (430 - schedThick)) + " " +
                            "L " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * 430) + " " +
                            "A 430 430 0 0 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes()) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes()) - 0.5)) * 430) + " " +
                            "L" +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes()) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes()) - 0.5)) * (430 - schedThick)) + " " +
                            "A " + (430 - schedThick) + " " + (430 - schedThick) + " 0 0 0 " +
                            (Math.cos(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.endTime.getHours(), task.endTime.getMinutes() - 5) - 0.5)) * (430 - schedThick))
                            
                          }
                          fill="#E17477"
                          opacity="0.5"
                        />
                    );
                })
            }
        </svg>
    );
};

const ClockApplication: React.FC<ClockAppProps> = (props) => { // clock app

    const [now, setNow] = useState(new Date());
    const [after12, setAfter12] = useState(new Date());
    const [taskProgress, setTaskProgress] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date());
            const add12Hour = new Date(now);
            add12Hour.setHours(add12Hour.getHours() + 12);
            setAfter12(add12Hour);
            const addItems: Task[] = [];
            
            if (props.tasks.length != 0 && ((now.getTime() < props.tasks[0].endTime.getTime() && props.tasks[0].endTime.getTime() < after12.getTime()) && props.tasks[0].beginTime.getTime() < now.getTime())) {
                setTaskProgress(true);
            } else {
                setTaskProgress(false);
            };

            props.tasks.forEach((task, index) => {
                if (taskProgress) {
                    if ( (task.endTime.getTime() - task.beginTime.getTime()) / 3600000 > 12 ) {
                        addItems.push({beginTime: now, endTime: after12});
                    } else if ( props.tasks[0].beginTime.getTime() <= task.beginTime.getTime() ) {
                        addItems.push(task);
                    }
                } else {
                    if (task.endTime.getTime() < now.getTime()) {// Finish task was Deleted.
                        props.deleteTask(index);
                    } else if ( now.getTime() < task.beginTime.getTime() && task.beginTime.getTime() < after12.getTime() ) {
                        addItems.push({beginTime: task.beginTime, endTime: (task.endTime.getTime() < after12.getTime() ? task.endTime : after12)});
                    };
                }
            });
            props.setDisplayTasks(addItems);
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
            <DigitalClock date = {now}/>
            <SchedObject tasks = {props.displayTasks} deleteTask = {props.deleteTask} />
            <ClockHands date = {now}/>
            <ClockFrame />
        </section>
    );
};

const Clock: React.FC<ClockAppProps> = (props) => {
    return (
        <ClockApplication tasks = {props.tasks} deleteTask = {props.deleteTask} displayTasks = {props.displayTasks} setDisplayTasks = {props.setDisplayTasks}/>
    );
};

export default Clock;