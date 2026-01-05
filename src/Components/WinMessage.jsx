import React from "react";

const WinMessage = ({ winner, moves, isSinglePlayer }) => {
  return (
    <div className="win-message">
      <div className="win-icon">🎉</div>
      <h2 style={{ color: winner.color }}>
        {isSinglePlayer ? "You Won!" : `${winner.name} Wins!`}
      </h2>
      <div className="win-stats">
        <div className="win-stat">
          <span className="win-stat-label">Score:</span>
          <span className="win-stat-value" style={{ color: winner.color }}>
            {winner.score}
          </span>
        </div>
        <div className="win-stat">
          <span className="win-stat-label">Total Moves:</span>
          <span className="win-stat-value">{moves}</span>
        </div>
      </div>
    </div>
  );
};

export default WinMessage;
