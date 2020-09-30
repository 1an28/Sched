import React, { useEffect, useState } from "react";

const ClockScale = () => { // text pannel
    const scaleStyle = {
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

const ClockHands = ( props ) => { // hands
    return (
        <h1> {props.now} </h1>
    );
};

const ClockApplication = ( props ) => { // clock app
    return (
        <section>
            <div> <ClockScale /></div>
            <div> <ClockHands now = {props.now} /> </div>
        </section>
    );
};

const Clock = () => {
    const [time, setTime] = useState(new Date().getTime());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date().getTime()), 1000);
        return () => clearInterval(timerId);
    })

    return (
        <ClockApplication now = {time}/>
    );
};

export default Clock;