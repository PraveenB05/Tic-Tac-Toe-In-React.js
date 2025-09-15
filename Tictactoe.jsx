import React, { useState } from 'react';
import './Tic.css';
import circle_icon from '../Assets/circle.png';
import cross from '../Assets/cross.png';

export const Tictactoe = () => {
    const [data, setData] = useState(Array(9).fill(""));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState(""); // To store winner or draw message

    const toggle = (num) => {
        if (lock || data[num] !== "") {
            return;
        }

        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
        } else {
            newData[num] = "o";
        }
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const resetGame = () => {
        setData(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setWinner("");
    };

    const renderIcon = (value) => {
        if (value === "x") {
            return <img src={cross} alt="cross" className="icon" />;
        } else if (value === "o") {
            return <img src={circle_icon} alt="circle" className="icon" />;
        }
        return null;
    };

    const checkWin = (newData) => {
        if (newData[0] === newData[1] && newData[1] === newData[2] && newData[0] !== "") {
            won(newData[0]);
        } else if (newData[3] === newData[4] && newData[4] === newData[5] && newData[3] !== "") {
            won(newData[3]);
        } else if (newData[6] === newData[7] && newData[7] === newData[8] && newData[6] !== "") {
            won(newData[6]);
        } else if (newData[0] === newData[3] && newData[3] === newData[6] && newData[0] !== "") {
            won(newData[0]);
        } else if (newData[1] === newData[4] && newData[4] === newData[7] && newData[1] !== "") {
            won(newData[1]);
        } else if (newData[2] === newData[5] && newData[5] === newData[8] && newData[2] !== "") {
            won(newData[2]);
        } else if (newData[0] === newData[4] && newData[4] === newData[8] && newData[0] !== "") {
            won(newData[0]);
        } else if (newData[2] === newData[4] && newData[4] === newData[6] && newData[2] !== "") {
            won(newData[2]);
        } else if (!newData.includes("")) { // Check for draw if no empty cells
            draw();
        }
    };

    const won = (player) => {
        setLock(true);
        setWinner(player);
    };

    const draw = () => {
        setLock(true);
        setWinner("Draw");
    };

    return (
        <div className="container">
            <h1 className="title">Tic Tac Toe Game In <span>React</span></h1>
            {winner && (
                <h2 className="winner-message">
                    {winner === "Draw" ? "It's a Draw!" : `🎉 Congrats ${winner.toUpperCase()} Wins! 🎉`}
                </h2>
            )}
            <div className="board">
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => toggle(index)}
                    >
                        {renderIcon(value)}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
};
