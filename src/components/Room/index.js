import React, { Component } from 'react';

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="room">
        Room {this.props.match.params.roomId}
      </div>
    );
  }
}
