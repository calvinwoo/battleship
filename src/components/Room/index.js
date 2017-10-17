import React, { Component } from 'react';
import { listen, unlisten, attack, restartGame } from '../../board-service';
import PlayerSelection from '../PlayerSelection';
import GameBoard from '../GameBoard';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: undefined,
      playerType: undefined
    };

    this.handleBoardChange = this.handleBoardChange.bind(this);
  }

  handleBoardChange(dataSnapshot) {
    this.setState({ boardState: dataSnapshot.val() });
  }

  componentDidUpdate(prevProps) {
    const prevRoomId = prevProps.match.params.roomId;
    const roomId = this.props.match.params.roomId;
    if (prevRoomId !== roomId) {
      unlisten(prevRoomId, this.handleBoardChange);
      listen(roomId, this.handleBoardChange);
    }
  }

  componentDidMount() {
    listen(this.props.match.params.roomId, this.handleBoardChange);
  }

  componentWillUnmount() {
    unlisten(this.props.match.params.roomId, this.handleBoardChange);
  }

  render() {
    const roomId = this.props.match.params.roomId;
    const renderContent = () => {
      if (!this.state.playerType) {
        return (
          <PlayerSelection
            handleSelectOne={() => this.setState({ playerType: 'player1' })}
            handleSelectTwo={() => this.setState({ playerType: 'player2' })}
          />
        );
      }

      const handleAttack = (attackPosition) => attack(this.state.boardState, roomId, attackPosition);

      return (
        <GameBoard
          boardState={this.state.boardState}
          playerType={this.state.playerType}
          handleAttack={handleAttack}
        />
      );
    };

    return (
      <div className="room">
        <h1>Room {roomId}</h1>
        {renderContent()}
        <button className="btn btn-outline-secondary" onClick={() => restartGame(roomId)}>
          Restart Game
        </button>
      </div>
    );
  }
}
