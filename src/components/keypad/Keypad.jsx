import React from 'react';

import './keypad.scss';

export default class Keypad extends React.Component {
  displayName = 'keypad';

  handleClick = e => {
    this.props.onInteraction(e.target.dataset.key);
  };

  render() {
    return (
      <div className={this.displayName}>
        {this.props.elements.map(k => (
          <button key={k.key} data-key={k.key} onClick={this.handleClick}>
            {k.key}
          </button>
        ))}
      </div>
    );
  }
}
