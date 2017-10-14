import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: ''
    };
  }

  render() {
    return (
      <div className="join">
        <input type="text" onChange={(event) => this.setState({ roomId: event.target.value })} />
        <div>
          <Link to={`/room/${this.state.roomId}`} className="btn btn-outline-primary">Go To Room</Link>
        </div>
      </div>
    );
  }
}
