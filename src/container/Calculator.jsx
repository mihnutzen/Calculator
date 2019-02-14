import React from 'react';

import {
  PLUSMINUS,
  EQUAL,
  CLEAR,
  PERC,
  numbers,
  utils,
  operations
} from '../data/data';
import { getData, getReserveLast, getResult } from '../helpers/calculator';

import Keypad from '../components/keypad/Keypad';
import Display from '../components/display/Display';

import './calculator.scss';

const initialCalculation = {
  calculation: '',
  lastInput: ''
};

export const initialState = {
  ...initialCalculation,
  keypads: {
    utils,
    operations,
    numbers
  }
};

export default class Calculator extends React.Component {
  displayName = 'calculator';
  state = { ...initialState };

  // handleKeyPress = e => {
  //   console.log('to do: key pres -> ', e.key);
  // };

  handleInteraction = key => {
    switch (key) {
      case CLEAR:
        this.clearResults();
        break;
      case EQUAL:
        this.setResult();
        break;
      case PLUSMINUS:
        this.reverseLastInput();
        break;
      case PERC:
        console.log('to do: %');
        break;
      default:
        this.setCalculation(key);
    }
  };

  clearResults() {
    this.setState({
      ...initialCalculation
    });
  }

  setResult() {
    const result = getResult(this.state.calculation);
    this.setState({
      lastInput: result,
      calculation: result
    });
  }

  setCalculation(key) {
    const { calculation, lastInput } = getData(
      key,
      this.state.lastInput,
      this.state.calculation
    );

    this.setState({
      calculation,
      lastInput
    });
  }

  reverseLastInput() {
    const { calculation, lastInput } = getReserveLast(
      this.state.lastInput,
      this.state.calculation
    );

    this.setState({
      calculation,
      lastInput
    });
  }

  render() {
    const {
      calculation,
      lastInput,
      keypads: { utils, operations, numbers }
    } = this.state;

    return (
      <div className={this.displayName}>
        <Display calculation={calculation} current={lastInput} />

        <div className={`${this.displayName}__main`}>
          <Keypad elements={utils} onInteraction={this.handleInteraction} />
          <Keypad elements={numbers} onInteraction={this.handleInteraction} />
        </div>
        <div className={`${this.displayName}__sidebar`}>
          <Keypad
            elements={operations}
            onInteraction={this.handleInteraction}
          />
        </div>
      </div>
    );
  }
}
