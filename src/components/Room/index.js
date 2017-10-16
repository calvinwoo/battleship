import React, { Component } from 'react';
import { listen, unlisten } from '../../board-service';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleBoardChange = this.handleBoardChange.bind(this);
  }

  handleBoardChange(dataSnapshot) {
    console.log(dataSnapshot.val());
  }

  componentDidUpdate(prevProps) {
    unlisten(prevProps.match.params.roomId, this.handleBoardChange);
    listen(this.props.match.params.roomId, this.handleBoardChange);
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
