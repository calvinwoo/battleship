import React from 'react';
import BoardTile from '../BoardTile';

export default ({ boardState, playerType, handleAttack }) => {
  const ships = playerType === 'player1' ? boardState.player1Board : boardState.player2Board;
  const enemyShips = playerType === 'player2' ? boardState.player1Board : boardState.player2Board;

  const renderRows = () => {
    return [...Array(5).keys()].map((row) => (
      <tr key={row}>
        {
          [...Array(5).keys()].map((column) => {
            const index = row * 5 + column;
            const isOwnShip = ships.some((ship) => ship.includes(index));
            const isEnemyShip = enemyShips.some((ship) => ship.includes(index));
            const isAttacked = (boardState.attacks || []).includes(index);

            return (
              <td key={column}>
                <BoardTile
                  isOwnShip={isOwnShip}
                  isEnemyShip={isEnemyShip}
                  isAttacked={isAttacked}
                  onClick={() => handleAttack(index)}
                />
              </td>
            );
          })
        }
      </tr>
    ));
  };

  return (
    <div className="game-board">
      <h4>
        Playing as:
        {playerType === 'player1' ? ' Player 1' : ' Player 2'}
      </h4>
      <table>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};
