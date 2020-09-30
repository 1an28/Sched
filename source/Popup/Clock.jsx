import React, { useEffect, useState } from "react";

const ClockScale = () => { // text pannel
    return (
        <h1>clock scale</h1>
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