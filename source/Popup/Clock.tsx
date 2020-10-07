import React from "react";

type Props = {
    now: String;
};

const ClockScale: React.FC = () => { // text pannel
    return (
        <h1>clock scale</h1>
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