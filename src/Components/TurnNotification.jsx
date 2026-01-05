import React from "react";

const TurnNotification = ({ player }) => {
  return (
    <div className="turn-notification">
      <div className="turn-notification-content" style={{ borderColor: player.color }}>
        <div className="turn-icon">👉</div>
        <h3 style={{ color: player.color }}>{player.name}'s Turn!</h3>
      </div>
    </div>
  );
};

export default TurnNotification;
