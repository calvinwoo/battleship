import React from 'react';
import classNames from 'classNames';
import './styles.css';

export default ({ onClick, isOwnShip, isEnemyShip, isAttacked, isActive }) => {
  const className = classNames({
    'board-tile': true,
    'own-ship': isOwnShip,
    'enemy-ship': isEnemyShip,
    'attacked': isAttacked,
    'active': isActive
  });

  return (
    <button
      className={className}
      onClick={onClick}
    >
      <span className="fa-stack">
        {(isOwnShip || (isAttacked && isEnemyShip)) && (
          <i className="fa fa-stack-1x fa-ship" />
        )}

        {isAttacked && (
          <i className="fa fa-stack-2x fa-times" />
        )}
      </span>
    </button>
  );
};
