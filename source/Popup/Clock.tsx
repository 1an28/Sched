import React, { useEffect, useState } from "react";

const ClockScale: React.FC = () => { // pannel
    const scaleStyle: React.CSSProperties = {
        width: "100%",
        height: "100%"
    };
    
    return (
        <svg style = {scaleStyle} viewBox = "-500 -500 1000 1000">
            <circle cx="0" cy="0" r="440" fill="#ccc" />
            <circle cx="0" cy="0" r="420" fill="#eee" />
        </svg>
    );
};

const ClockHands: React.FC = () => { // hands
    const getTransformAttr = ( degree: number ) => {
        const val = "rotate(" + degree + ")";
        return val;
    };

    const [now, setNow] = useState(new Date().getTime());
    const [targetDate, setTargetDate] = useState(new Date());

    const [degreeSeconds, setDegreeSeconds] = useState((targetDate.getSeconds() / 60) * 360 + (targetDate.getMilliseconds() / 1000) * (360 / 60));
    const [degreeMinutes, setDegreeMinutes] = useState((targetDate.getMinutes() / 60) * 360 + ((degreeSeconds / 360) * (360 / 60)));
    const [degreeHours, setDegreeHours] = useState((targetDate.getHours() / 12) * 360 + ((degreeMinutes / 360) * (360 / 60)));

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date().getTime());
            setTargetDate(new Date(now));
            setDegreeSeconds((targetDate.getSeconds() / 60) * 360 + (targetDate.getMilliseconds() / 1000) * (360 / 60)); 
            setDegreeMinutes((targetDate.getMinutes() / 60) * 360 + ((degreeSeconds / 360) * (360 / 60)));
            setDegreeHours((targetDate.getHours() / 12) * 360 + ((degreeMinutes / 360) * (360 / 60)));
        }, 100);
        return () => clearInterval(timerId);
    })

    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <defs>
                <g id = "def_hand_long">
                    <polygon points = "-5,-360 5,-360 10,30 -10,30" fill = "#888" />
                </g>
                <g id = "def_hand_short">
                    <polygon points = "-5,-300 5,-300 10,30 -10,30" fill = "#888" />
                </g>
                <g id = "def_hand_second">
                    <polygon points = "-2,-360 2,-360 3,30 -3,30" fill = "#CCC" />
                </g>
            </defs>
            <use id = "hand_long" xlinkHref = "#def_hand_long" transform = {getTransformAttr(degreeMinutes)} ></use>
            <use id = "hand_short" xlinkHref = "#def_hand_short" transform = {getTransformAttr(degreeHours)} ></use>
            <use id = "hand_second" xlinkHref = "#def_hand_second" transform = {getTransformAttr(degreeSeconds)} ></use>
        </svg>
    );
};

const ClockApplication: React.FC = () => { // clock app

    const ClockAppStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        paddingBottom: "100%"
    };

    return (
        <section style = {ClockAppStyle}>
            <div> <ClockScale /></div>
            <div> <ClockHands /> </div>
        </section>
    );
};


const Clock: React.FC = () => {
    
    return (
        <ClockApplication />
    );
};

export default Clock;