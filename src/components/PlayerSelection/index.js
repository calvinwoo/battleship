import React from 'react';

export default ({ handleSelectOne, handleSelectTwo }) => {
  return (
    <div className="player-selection">
      <h2>Select player</h2>
      <button className="btn btn-outline-primary" onClick={handleSelectOne}>
        Player One
      </button>

      <button className="btn btn-outline-primary" onClick={handleSelectTwo}>
        Player Two
      </button>
    </div>
  );
};
