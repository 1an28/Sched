import React, { useEffect, useState } from "react";

type TasksProps = {
    tasks: Task[];
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
        let long = task.endTime.getHours() + task.endTime.getMinutes() / 60 - task.beginTime.getHours() - task.beginTime.getMinutes() / 60;

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
                props.tasks.map((task, index) => {
                    return(
                        <path
                          id = {"task" + index }
                          d = {
                            "M " + 
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * (430 - schedThick)) + " " +
                            "A 30 30 0 0 1 " +
                            (Math.cos(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * 430) + " " +
                            (Math.sin(Math.PI * (numberToDegree(task.beginTime.getHours(), task.beginTime.getMinutes() + 10) - 0.5)) * 430) + " " +
                            "A 440 440 0 " + checkFlag(task) + " 1 " +
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
                            "A 440 440 0 0 1 " +
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
                        />
                    );
                })
            }
        </svg>
    );
};

const ClockApplication: React.FC<TasksProps> = (props) => { // clock app

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
            <SchedObject tasks = {props.tasks} />
            <ClockHands date = {targetDate}/>
            <ClockFrame />
        </section>
    );
};

const Clock: React.FC<TasksProps> = (props) => {
    return (
        <ClockApplication tasks = {props.tasks}/>
    );
};

export default Clock;