import React, { useEffect, useState } from "react";

const ClockScale = () => { // text pannel
    const svgStyle = {
        width: "100%",
        height: "100%"
    };

    return (
        <svg style = {svgStyle} viewBox = "-500 -500 1000 1000">
            <circle cx="0" cy="0" r="440" fill="#ccc" />
            <circle cx="0" cy="0" r="420" fill="#eee" />
        </svg>
    );
};

const ClockHands = ( props ) => { // hands
    const getTransformAttr = ( degree ) => {
        const val = "rotate(" + degree + ")";
        return val;
    };

    const [degreeSeconds, setDegreeSeconds] = useState((props.now.getSeconds() / 60) * 360 + (props.now.getMilliseconds() / 1000) * (360 / 60));

    useEffect(() => {
        const getTimerId = setInterval(() => {
            setDegreeSeconds((props.now.getSeconds() / 60) * 360 + (props.now.getMilliseconds() / 1000) * (360 / 60));
        }, 100 );
        return () => clearInterval(getTimerId);
    });

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

            <use id = "hand_second" xlinkHref = "#def_hand_second" transform = {getTransformAttr(degreeSeconds)} ></use>
        </svg>
    );
};

const ClockApplication = ( props ) => { // clock app

    const divStyle = {
        width: "95%",
        height: "95%"
    };

    const ClockAppStyle = {
        position: "relative",
        width: "100%",
        paddingBottom: "100%"
    };

    return (
        <section style = {ClockAppStyle}>
            <div style = {divStyle}> <ClockScale /></div>
            <div style = {divStyle}> <ClockHands now = {props.now} /> </div>
        </section>
    );
};

const Clock = () => {
    const [now, setNow] = useState(new Date().getTime());
    const [targetDate, setTargetDate] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setNow(new Date().getTime());
            setTargetDate(new Date(now));
        }, 100 );
        return () => clearInterval(timerId);
    });

    return (
        <ClockApplication now = {targetDate}/>
    );
};

export default Clock;