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
            const onClick = () => handleAttack(index);

            return (
              <td key={column}>
                <BoardTile
                  isOwnShip={isOwnShip}
                  isEnemyShip={isEnemyShip}
                  isAttacked={isAttacked}
                  onClick={onClick}
                  isActive={playerType === boardState.turn}
                />
              </td>
            );
          })
        }
      </tr>
    ));
  };

  const renderInstructions = () => {
    if (playerType !== boardState.turn) {
      return <h4>Waiting for opposing player...</h4>;
    }
    return <h4>Click a tile to attack!</h4>
  };

  return (
    <div className="game-board">
      {renderInstructions()}
      <table>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};
