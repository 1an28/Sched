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
    return (
        <svg width = "100%" height = "100%" viewBox = "-500 -500 1000 1000">

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
    const [time, setTime] = useState(new Date().getTime());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <ClockApplication now = {time}/>
    );
};

export default Clock;