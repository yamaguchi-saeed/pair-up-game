import React from "react";

const GameHeader = ({
  onReset,
  selectedTheme,
  onThemeChange,
  onImageUpload,
  uploadError,
  numPlayers,
  onNumPlayersChange,
  players,
  currentPlayerIndex,
  moves,
  isCustomThemeReady,
  numPairs,
  onNumPairsChange,
  maxPairs,
  collapsed,
  onToggleCollapse,
  gameStarted,
}) => {
  return (
    <header className={`game-header ${collapsed ? "collapsed" : ""}`}>
      {/* Hamburger toggle button - ALWAYS visible when collapsed */}
      {collapsed && gameStarted && (
        <button className="header-toggle" onClick={onToggleCollapse}>
          ☰
        </button>
      )}

      {!collapsed && (
        <>
          {/* Close button when expanded during game */}
          {gameStarted && (
            <button className="header-toggle header-close" onClick={onToggleCollapse}>
              ✕
            </button>
          )}

          <div className="title-section">
            <h1>
              <span className="game-icon">🎮</span>
              Pair Up Game
            </h1>
          </div>

          {/* Stats Section - show in single player */}
          {numPlayers === 1 && gameStarted ? (
            <div className="stats">
              <div className="stat-item">
                <div className="stat-label">Score</div>
                <div className="stat-value">{players[0]?.score || 0}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Moves</div>
                <div className="stat-value">{moves}</div>
              </div>
            </div>
          ) : gameStarted ? (
            // Multiplayer: Show all players with current player highlighted
            <div className="players-section">
              {players.map((player, idx) => (
                <div
                  key={player.id}
                  className={`player-card ${
                    idx === currentPlayerIndex ? "active" : ""
                  }`}
                  style={{
                    borderColor: player.color,
                    boxShadow:
                      idx === currentPlayerIndex
                        ? `0 0 20px ${player.color}40`
                        : "none",
                  }}
                >
                  <div className="player-name" style={{ color: player.color }}>
                    {player.name}
                  </div>
                  <div className="player-score">{player.score}</div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Controls Section */}
          <div className="controls-section">
            {/* Number of Players Selector */}
            <div className="control-group">
              <label htmlFor="players-select" className="control-label">
                Players
              </label>
              <select
                id="players-select"
                className="players-select"
                value={numPlayers}
                onChange={(e) => onNumPlayersChange(Number(e.target.value))}
              >
                <option value={1}>1 Player</option>
                <option value={2}>2 Players</option>
                <option value={3}>3 Players</option>
                <option value={4}>4 Players</option>
              </select>
            </div>

            {/* Number of Pairs Selector */}
            <div className="control-group">
              <label htmlFor="pairs-select" className="control-label">
                Pairs
              </label>
              <select
                id="pairs-select"
                className="pairs-select"
                value={numPairs}
                onChange={(e) => onNumPairsChange(Number(e.target.value))}
              >
                <option value={6}>6 pairs (12 cards)</option>
                <option value={8}>8 pairs (16 cards)</option>
                <option value={10}>10 pairs (20 cards)</option>
                <option value={12}>12 pairs (24 cards)</option>
                <option value={15}>15 pairs (30 cards)</option>
                <option value={18}>18 pairs (36 cards)</option>
                <option value={20}>20 pairs (40 cards)</option>
                <option value={25}>25 pairs (50 cards)</option>
                <option value={26}>26 pairs (52 cards)</option>
              </select>
              {numPairs > maxPairs && (
                <span className="warning-text">
                  ⚠️ Max {maxPairs} pairs for this theme
                </span>
              )}
            </div>

            {/* New Game Button */}
            <button onClick={onReset} className="reset-btn">
              <span>🔄</span>
              New Game
            </button>

            {/* Theme Dropdown */}
            <div className="control-group">
              <label htmlFor="theme-select" className="control-label">
                Theme
              </label>
              <select
                id="theme-select"
                className="theme-select"
                value={selectedTheme}
                onChange={(e) => onThemeChange(e.target.value)}
              >
                <option value="flags">🏁 Flags</option>
                <option value="fruits">🍎 Fruits</option>
                <option value="japan">🗾 Japan</option>
                <option value="cards">🃏 Cards</option>
                <option value="custom">
                  📁 Custom {isCustomThemeReady ? "✓" : ""}
                </option>
              </select>
            </div>

            {/* Upload Button - made this to "ONLY" be displayed when custom theme is selected, so if its not selected, user cannot upload */}
            {selectedTheme === "custom" && (
              <div className="upload-btn-wrapper">
                <label className="upload-btn" htmlFor="image-upload">
                  <span>📤</span>
                  Upload Images
                </label>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageUpload}
                  className="upload-input"
                />
              </div>
            )}
          </div>

          {/* Upload Error Message */}
          {uploadError && <div className="error-message">{uploadError}</div>}

          {/* Upload Instructions for Custom Theme - less than 8 feels small and not really practical */}
          {selectedTheme === "custom" && !isCustomThemeReady && (
            <div className="info-message">
              ℹ️ Upload at least 8 images to use custom theme
            </div>
          )}
        </>
      )}

      {/* Collapsed view */}
      {collapsed && gameStarted && (
        <div className="collapsed-info">
          <span className="collapsed-score">
            {numPlayers === 1 
              ? `Score: ${players[0]?.score || 0} | Moves: ${moves}`
              : `${players[currentPlayerIndex]?.name}: ${players[currentPlayerIndex]?.score || 0}`
            }
          </span>
        </div>
      )}
    </header>
  );
};

export default GameHeader;