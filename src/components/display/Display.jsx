import React from 'react';

import { isOperation, getResult } from '../../helpers/calculator';

import './display.scss';

export default class Display extends React.Component {
  displayName = 'display';
  state = {
    result: 0
  };

  componentDidUpdate(prevProps) {
    const isLastOp = isOperation(
      this.props.calculation.charAt(this.props.calculation.length - 1)
    );

    if (
      !isLastOp &&
      (prevProps.calculation !== this.props.calculation ||
        prevProps.current !== this.props.current)
    ) {
      this.setState({
        result: getResult(this.props.calculation)
      });
    }
  }

  render() {
    return (
      <div className={this.displayName}>
        {this.props.current || this.state.result}
      </div>
    );
  }
}
