import React, { useState } from "react";

import TimeSelect from "../time-select";

import './app.css';
import {AtoB, BtoA} from '../../schedule.js';

function App() {

    const [destination, setDestination] = useState("из A в B");
    const [quantity, setQuantity] = useState(1);
    const [toTime, setToTime] = useState(new Date(AtoB[0]));
    const [fromTime, setFromTime] = useState(new Date(BtoA[2]));
    const [result, setResult] = useState("");

    const changeDestination = (e) => {
        const d = e.target.value;
        if (d === "из B в A") setToTime(new Date(AtoB[0]));
        setDestination(d);
    }

    const changeToTime = (time) => {
        setToTime(time);
    }

    const changeFromTime = (time) => {
        setFromTime(time);
    }

    const changeQuantity = (e) => {
        setQuantity(Number(e.target.value));
    }

    const calculateTrip = () => {
        const cost = (destination === "из A в B и обратно в А") ? 1200 * quantity : 700 * quantity;
        let tickets = "";
        let q = quantity;
        if (q > 20) q = Number(q.toString().split('').pop());
        switch(q) {
            case 1:
                tickets = "билет";
                break;
            case 2:
            case 3:
            case 4:
                tickets = "билета";
                break;
            default:
                tickets = "билетов";
        };
        const length = (destination === "из A в B и обратно в А") ? "1 час 40 минут" : "50 минут";

        setResult(
            `Вы выбрали ${quantity} ${tickets} по маршруту ${destination} стоимостью ${cost}р.
            Это путешествие займет у вас ${length}. 
            ${(destination === "из A в B и обратно в А") ?
             `Теплоход отправляется из A в B в ${toTime.toLocaleTimeString().slice(0, 5)}, 
                а прибудет в ${new Date(toTime.getTime() + 3000000).toLocaleTimeString().slice(0, 5)}. 
                Обратно теплоход отправляется в ${fromTime.toLocaleTimeString().slice(0, 5)}, 
                а прибудет в ${new Date(fromTime.getTime() + 3000000).toLocaleTimeString().slice(0, 5)}.` :
            (destination === "из A в B") ?
             `Теплоход отправляется в ${toTime.toLocaleTimeString().slice(0, 5)}, 
                а прибудет в ${new Date(toTime.getTime() + 3000000).toLocaleTimeString().slice(0, 5)}.` :
             `Теплоход отправляется в ${fromTime.toLocaleTimeString().slice(0, 5)}, 
                а прибудет в ${new Date(fromTime.getTime() + 3000000).toLocaleTimeString().slice(0, 5)}.`}`);
    }

    return (
            
        <main className="container p-5 my-5 rounded d-flex flex-column bg-light shadow-sm">
            <form name="tickets" className="form w-100">
                <div className="my-3">
                    <select className="form-select" name="route" id="route" onChange={changeDestination}>
                        <option value="из A в B">из A в B</option>
                        <option value="из B в A">из B в A</option>
                        <option value="из A в B и обратно в А">из A в B и обратно в А</option>
                    </select>
                </div>
                
                {(destination !== "из B в A") && <TimeSelect direction="из A в B" onChange={changeToTime}
                    toTime={toTime} fromTime={fromTime} destination={destination} />}

                {(destination !== "из A в B") && <TimeSelect direction="из B в A" onChange={changeFromTime} 
                    toTime={toTime} fromTime={fromTime} destination={destination} />}

                <div className="my-3">
                    <label htmlFor="num" className="form-label">Количество билетов:</label>
                    <input className="form-control" id="num" type="number" min="1" value={quantity} onChange={changeQuantity} />
                </div>

            </form>
            
            <button className="btn btn-warning my-3" onClick={calculateTrip}>Посчитать</button>
            
            <div id="result" className="my-3">{result}</div>
        </main>
    );
}

export default App;