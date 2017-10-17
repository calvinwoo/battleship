import React from 'react';
import './styles.css';

export default ({ handleSelectOne, handleSelectTwo }) => {
  return (
    <div className="player-selection">
      <h4>Select player:</h4>
      <button className="btn btn-outline-primary" onClick={handleSelectOne}>
        Player One
      </button>

      <button className="btn btn-outline-primary" onClick={handleSelectTwo}>
        Player Two
      </button>
    </div>
  );
};
