import React, { useEffect, useState } from "react";

type Props = {
    date: Date;
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
    const getTransformAttr = ( degree: number ) => {
        const val = "rotate(" + degree + ")";
        return val;
    };

    const [degreeSeconds, setDegreeSeconds] = useState((props.date.getSeconds() / 60) * 360 + (props.date.getMilliseconds() / 1000) * (360 / 60));
    const [degreeMinutes, setDegreeMinutes] = useState((props.date.getMinutes() / 60) * 360 + ((degreeSeconds / 360) * (360 / 60)));
    const [degreeHours, setDegreeHours] = useState((props.date.getHours() / 12) * 360 + ((degreeMinutes / 360) * (360 / 60)));

    useEffect(() => {
        setDegreeSeconds((props.date.getSeconds() / 60) * 360 + (props.date.getMilliseconds() / 1000) * (360 / 60)); 
        setDegreeMinutes((props.date.getMinutes() / 60) * 360 + ((degreeSeconds / 360) * (360 / 60)));
        setDegreeHours((props.date.getHours() / 12) * 360 + ((degreeMinutes / 360) * (360 / 60)));
    }, [props.date]);

    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">
            <defs>
                <g id = "def_hand_long">
                    <polygon points = "-8,-440 8,-440 5,-250 -5,-250" fill = "#888" />
                </g>
                <g id = "def_hand_short">
                    <polygon points = "-10,-440 10,-440 5,-300 -5,-300" fill = "#888" />
                </g>
                <g id = "def_hand_second">
                    <polygon points = "-5,-440 5,-440 3,-250 -3,-250" fill = "#CCC" />
                </g>
            </defs>
            <use id = "hand_long" xlinkHref = "#def_hand_long" transform = {getTransformAttr(degreeMinutes)} ></use>
            <use id = "hand_short" xlinkHref = "#def_hand_short" transform = {getTransformAttr(degreeHours)} ></use>
            <use id = "hand_second" xlinkHref = "#def_hand_second" transform = {getTransformAttr(degreeSeconds)} ></use>
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
            <div> <ClockScale /> </div>
            <div> <ClockHands date = {targetDate}/> </div>
            <div> <DigitalClock date = {targetDate}/> </div>
        </section>
    );
};


const Clock: React.FC = () => {
    return (
        <ClockApplication />
    );
};

export default Clock;