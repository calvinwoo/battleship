import React from 'react';

export default ({ onClick }) => {
  return (
    <button className="board-tile" onClick={onClick}>
      o
    </button>
  );
};
