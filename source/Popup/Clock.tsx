import React from "react";

type Props = {
    now: String;
};

const ClockScale: React.FC = () => { // text pannel
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

const ClockHands: React.FC<Props> = ( props ) => { // hands
    return (
        <h1> {props.now} </h1>
    );
};

const ClockApplication: React.FC<Props> = ( props ) => { // clock app
    return (
        <section>
            <div> <ClockScale /></div>
            <div> <ClockHands now = {props.now} /> </div>
        </section>
    );
};


const Clock: React.FC = () => {
    return (
        <ClockApplication now = "123" />
    );
};

export default Clock;