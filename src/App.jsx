import { useEffect, useState, useCallback, useMemo } from "react";
import GameHeader from "./Components/GameHeader";
import Card from "./Components/Card";
import WinMessage from "./Components/WinMessage";
import TurnNotification from "./Components/TurnNotification";
import themes from "./themes";

// Player color palette
const PLAYER_COLORS = ["#818cf8", "#f472b6", "#34d399", "#fbbf24", "#fb923c", "#a78bfa"];

// Match delay timings
const MATCH_DELAY = 400;
const MISMATCH_DELAY = 1000;
const NOTIFICATION_DURATION = 1000;

function App() {
  // Theme & customization
  const [selectedTheme, setSelectedTheme] = useState("flags");
  const [customImages, setCustomImages] = useState([]);
  const [uploadError, setUploadError] = useState("");
  
  // Game configuration
  const [numPlayers, setNumPlayers] = useState(1);
  const [numPairs, setNumPairs] = useState(8);
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [cards, setCards] = useState([]);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [moves, setMoves] = useState(0);
  
  // Card interaction state
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  // UI state
  const [showTurnNotification, setShowTurnNotification] = useState(false);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);

  // Get current theme data
  const currentTheme = useMemo(() => {
    if (selectedTheme === "custom" && customImages.length > 0) {
      return customImages;
    }
    return themes[selectedTheme] || themes.flags;
  }, [selectedTheme, customImages]);

  // Get max possible pairs based on theme
  const maxPairs = useMemo(() => currentTheme.length, [currentTheme]);

  // Initialize players when number changes
  useEffect(() => {
    const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      score: 0,
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
    }));
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
  }, [numPlayers]);

  // Initialize game
  const initializeGame = useCallback(() => {
    // Randomly select numPairs cards from theme
    const shuffledTheme = [...currentTheme].sort(() => Math.random() - 0.5);
    const selectedCards = shuffledTheme.slice(0, numPairs);
    
    // Create pairs and shuffle
    const images = selectedCards
      .flatMap((img) => [
        { ...img, uid: `${img.id}-a-${crypto.randomUUID()}` },
        { ...img, uid: `${img.id}-b-${crypto.randomUUID()}` },
      ])
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(images);
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setMoves(0);
    setCurrentPlayerIndex(0);
    setPlayers((prev) => prev.map((p) => ({ ...p, score: 0 })));
    setGameStarted(true);
    setHeaderCollapsed(true);
  }, [currentTheme, numPairs]);

  // Flip a single card
  const flipCard = useCallback((clickedCard) => {
    setCards((prev) =>
      prev.map((c) => (c.uid === clickedCard.uid ? { ...c, isFlipped: true } : c))
    );
  }, []);

  // Reset turn state
  const resetTurn = useCallback(() => {
    setFirstCard(null);
    setSecondCard(null);
    if (!showTurnNotification) {
      setDisabled(false);
    }
  }, [showTurnNotification]);

  // Handle card click
  const handleCardClick = useCallback((card) => {
    // Block clicks during notification, disabled state, or if card already flipped/matched
    if (showTurnNotification || disabled || card.isFlipped || card.isMatched) {
      return;
    }

    // First card selection
    if (!firstCard) {
      setFirstCard(card);
      flipCard(card);
      return;
    }

    // Second card selection
    setSecondCard(card);
    flipCard(card);
    setDisabled(true);
    setMoves((m) => m + 1);
  }, [showTurnNotification, disabled, firstCard, flipCard]);

  // Check for match when both cards are selected
  useEffect(() => {
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.id === secondCard.id;

    if (isMatch) {
      // Match found!
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id ? { ...c, isMatched: true } : c
          )
        );

        // Increment current player's score
        setPlayers((prev) =>
          prev.map((p, idx) =>
            idx === currentPlayerIndex ? { ...p, score: p.score + 1 } : p
          )
        );

        resetTurn();
      }, MATCH_DELAY);
    } else {
      // No match - flip back and switch turns
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.isMatched ? c : { ...c, isFlipped: false }))
        );

        // Switch to next player in multiplayer
        if (numPlayers > 1) {
          const nextPlayerIndex = (currentPlayerIndex + 1) % numPlayers;
          setCurrentPlayerIndex(nextPlayerIndex);
          
          // Show turn notification and keep cards disabled
          setShowTurnNotification(true);
          setDisabled(true);
          
          setTimeout(() => {
            setShowTurnNotification(false);
            setDisabled(false);
          }, NOTIFICATION_DURATION);
        }

        resetTurn();
      }, MISMATCH_DELAY);
    }
  }, [firstCard, secondCard, currentPlayerIndex, numPlayers, resetTurn]);

  // Handle custom image upload
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    setUploadError("");

    if (files.length < 8) {
      setUploadError(`Please upload at least 8 images (you uploaded ${files.length})`);
      return;
    }

    const allImages = files.every((file) => file.type.startsWith("image/"));
    if (!allImages) {
      setUploadError("All files must be images");
      return;
    }

    const imageObjects = files.map((file, index) => ({
      id: `custom-${index + 1}`,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      src: URL.createObjectURL(file),
    }));

    setCustomImages(imageObjects);
    setSelectedTheme("custom");
    e.target.value = ""; // Clear input
  }, []);

  // Cleanup blob URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      customImages.forEach((img) => {
        if (img.src.startsWith("blob:")) {
          URL.revokeObjectURL(img.src);
        }
      });
    };
  }, [customImages]);

  // Handle theme change
  const handleThemeChange = useCallback((newTheme) => {
    setSelectedTheme(newTheme);
    
    // Clean up custom images if switching away from custom, for privacy reasons
    if (newTheme !== "custom") {
      customImages.forEach((img) => {
        if (img.src.startsWith("blob:")) {
          URL.revokeObjectURL(img.src);
        }
      });
      setCustomImages([]);
    }
  }, [customImages]);

  // Check if game is complete
  const isGameComplete = useMemo(() => 
    cards.length > 0 && cards.every((c) => c.isMatched),
    [cards]
  );

  // Get winner
  const winner = useMemo(() => {
    if (!isGameComplete || players.length === 0) return null;
    return players.reduce((max, player) => 
      player.score > max.score ? player : max
    );
  }, [isGameComplete, players]);

  // Determine grid size class based on number of pairs
  const gridSizeClass = useMemo(() => {
    if (numPairs <= 8) return 'small';
    if (numPairs <= 15) return 'medium';
    return 'large';
  }, [numPairs]);

  return (
    <div className="app">
      <GameHeader
        onReset={initializeGame}
        selectedTheme={selectedTheme}
        onThemeChange={handleThemeChange}
        onImageUpload={handleImageUpload}
        uploadError={uploadError}
        numPlayers={numPlayers}
        onNumPlayersChange={setNumPlayers}
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        moves={moves}
        isCustomThemeReady={customImages.length >= 8}
        numPairs={numPairs}
        onNumPairsChange={setNumPairs}
        maxPairs={maxPairs}
        collapsed={headerCollapsed}
        onToggleCollapse={() => setHeaderCollapsed(!headerCollapsed)}
        gameStarted={gameStarted}
      />

      {showTurnNotification && numPlayers > 1 && (
        <TurnNotification player={players[currentPlayerIndex]} />
      )}

      {isGameComplete && winner && (
        <WinMessage 
          winner={winner} 
          moves={moves} 
          isSinglePlayer={numPlayers === 1} 
        />
      )}

      <div className={`cards-grid cards-grid-${gridSizeClass}`}>
        {cards.map((card) => (
          <Card 
            key={card.uid} 
            card={card} 
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
