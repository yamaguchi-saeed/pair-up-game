import React, { memo } from "react";

const Card = memo(({ card, onClick }) => {
  //Check if card is an image or emoji or text
  const isImage = 
    card.src.startsWith("blob:") || 
    card.src.startsWith("http") || 
    card.src.startsWith("data:") ||
    card.src.startsWith("/");

  const handleClick = () => {
    // Trigger onClick if card is not already flipped or matched
    if (!card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""} ${
        card.isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-front">?</div>

      <div className="card-back">
        {isImage ? (
          <img 
            src={card.src} 
            alt={card.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "13px",
              padding: "4px"
            }}
          />
        ) : (
          <span>{card.src}</span>
        )}
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;