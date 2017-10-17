import React from 'react';
import BoardTile from '../BoardTile';

export default ({ boardState, playerType, handleAttack }) => {
  const renderRows = () => {
    return [...Array(10).keys()].map((row) => (
      <tr key={row}>
        {
          [...Array(10).keys()].map((column) => (
            <td key={column}>
              <BoardTile onClick={() => handleAttack(row * 10 + column)} />
            </td>
          ))
        }
      </tr>
    ));
  };

  return (
    <div className="game-board">
      {playerType}
      {boardState.attacks}
      <table>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
};
