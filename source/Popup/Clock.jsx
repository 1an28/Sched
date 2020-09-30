import React, { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 200);
        return () => clearInterval(timerId);
    })

    return (
        <h2> {time.getHours()} : {time.getMinutes()} : {time.getSeconds()} </h2>
    );
};

export default Clock;