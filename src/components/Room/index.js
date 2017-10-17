import React, { Component } from 'react';
import { listen, unlisten } from '../../board-service';

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
    console.log(dataSnapshot.val());
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
    return (
      <div className="room">
        Room {this.props.match.params.roomId}
      </div>
    );
  }
}
