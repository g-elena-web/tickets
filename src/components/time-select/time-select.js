import React, { useEffect } from "react";

import {AtoB, BtoA} from '../../schedule.js';

function TimeSelect(props) {

    const { direction, onChange, toTime, fromTime, destination } = props;

    const schedule = (direction === "из A в B") ? 
        AtoB.map(time => [time.slice(11, 16), new Date(time)]) : 
        (direction === "из B в A") ? 
        (destination === "из A в B и обратно в А") ?
        BtoA.filter(time => new Date(time).getTime() - toTime.getTime() >= 3000000).map(time => [time.slice(11, 16), new Date(time)]) : 
        (destination === "из B в A") ?
        BtoA.map(time => [time.slice(11, 16), new Date(time)]) : [] : [];

    const options = schedule.map(time =>
                <option value={`${time[0]}(${direction})`} key={time[0]}>{time[1].toLocaleTimeString().slice(0, 5)}</option>
            );

    const changeTime = (e) => {
        const chosenTime = e.target.value.slice(0, 5);
        const fullTime = schedule[schedule.findIndex(time => time[0] === chosenTime)][1];
        onChange(fullTime);
    }

    const id = (direction === "из A в B") ? "time-1" : "time-2";

    useEffect(() => {
        const chosenTime = document.forms["tickets"][id].value.slice(0, 5);
        const fullTime = schedule[schedule.findIndex(time => time[0] === chosenTime)][1];
        if (((direction === "из A в B") && (toTime.toString() != fullTime.toString())) 
            || ((direction === "из B в A") && (fromTime.toString() != fullTime.toString()))) {
            onChange(fullTime);
        }
    }, [toTime, fromTime])
    
    return (
        <div className="my-3">
            <label htmlFor={id} className="form-label">Выберите время {direction}:</label>
            <select className="form-select" name={id} id={id} onChange={changeTime}>
                {options}
            </select>
        </div>
    );
}

export default TimeSelect;