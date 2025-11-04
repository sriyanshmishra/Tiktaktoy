import React, { useRef, useState } from "react";

function tiktak() {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [xTurn, setxTurn] = useState(true);

    const winnerRef = useRef(null);

    const handleClick = (index) => {

        if (board[index] || winnerRef.current)
            return;

        const newBoard = [...board];
        newBoard[index] = xTurn ? "x" : "O";
        setBoard(newBoard);
        setxTurn(!xTurn);

        

        const win = CheckWinner(newBoard);
        if (win) {
            winnerRef.current = win;
            setTimeout(() => alert('Winner is $ {win}!'), 200);
        }
            
        
    };

    const CheckWinner = (squares) => {
        // if (!Array.isArray(squares) || squares.length < 9) return null;
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let [a, b, c] of combos) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a];
        }
        return null;
    };

    const resetgame = () => {
        setBoard(Array(9).fill(null));
        setxTurn(true);
        winnerRef.current = null;
    };

    return (

        <div className="game">
            <h1>TIC TAC TOE</h1>

            <div className="board">
                {board.map((cell, i) => (
                    <button key={i} className="cell" onClick={() => handleClick(i)}>{cell}</button>
                ))}
            </div>

            <h2>
                {winnerRef.current
                    ? `winner: ${winnerRef.current}`
                    : board.every(Boolean)
                    
                        ? "it's a draw!"
                        : `turn: ${xTurn ? "x" : "0"}`
                }
            </h2>

            <button onClick={resetgame} className="reset">Restart</button>
        </div>

    );

}

export default tiktak;