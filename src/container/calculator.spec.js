import React from 'react';
import { shallow } from 'enzyme';

import Calculator from './Calculator';

import { CLEAR, EQUAL, PLUSMINUS, PERC } from '../data/data';

describe('the <Calculator /> component', () => {
  let component;
  let instance;
  let setup;

  const getDefaultProps = () => ({
    elements: [],
    onInteraction: () => {}
  });

  setup = (props = {}) => {
    const componentProps = {
      ...getDefaultProps(),
      ...props
    };
    const component = shallow(<Calculator {...componentProps} />);
    const instance = component.instance();

    return {
      component,
      componentProps,
      instance
    };
  };

  beforeEach(() => {
    const newSetup = setup();
    component = newSetup.component;
    instance = newSetup.instance;
  });

  describe('Rendering', () => {
    it('should render the component correctly', () => {
      expect(component.exists()).toBeTruthy();

      // should have 3 keypads
      expect(component.find('Keypad').length).toBe(3);

      // should have a display
      expect(component.find('Display').exists()).toBeTruthy();
    });
  });

  describe('Instance', () => {
    describe('handleInteraction()', () => {
      it('Should call clearResults', () => {
        instance.clearResults = jest.fn();
        instance.handleInteraction(CLEAR);

        expect(instance.clearResults).toHaveBeenCalled();
      });

      it('Should call setResult', () => {
        instance.setResult = jest.fn();
        instance.handleInteraction(EQUAL);

        expect(instance.setResult).toHaveBeenCalled();
      });

      it('Should call reverseLastInput', () => {
        instance.reverseLastInput = jest.fn();
        instance.handleInteraction(PLUSMINUS);

        expect(instance.reverseLastInput).toHaveBeenCalled();
      });

      // TODO
      // it('Should call handleKeyPress', () => {
      //   instance.handleKeyPress = jest.fn();
      //   instance.handleInteraction(PERC);

      //   expect(instance.handleKeyPress).toHaveBeenCalled();
      // });
    });

    describe('clearResults()', () => {
      it('should clear the result', () => {
        component.setState({
          lastInput: '2',
          calculation: '2'
        });

        instance.clearResults();

        expect(instance.state.lastInput).toEqual('');
        expect(instance.state.calculation).toEqual('');
      });
    });

    describe('setResult()', () => {
      it('should set the result', () => {
        component.setState({
          lastInput: '',
          calculation: '2+2+2'
        });

        instance.setResult();

        expect(instance.state.lastInput).toEqual('6');
        expect(instance.state.calculation).toEqual('6');
      });
    });

    describe('setCalculation()', () => {
      it('should set calculation by adding to last number', () => {
        component.setState({
          lastInput: '2',
          calculation: '2+2'
        });

        instance.setCalculation(2);

        expect(instance.state.lastInput).toEqual('22');
        expect(instance.state.calculation).toEqual('2+22');
      });

      it('should set calculation by replacing operation', () => {
        component.setState({
          lastInput: '',
          calculation: '2+'
        });

        instance.setCalculation('-');

        expect(instance.state.lastInput).toEqual('');
        expect(instance.state.calculation).toEqual('2-');
      });
    });

    describe('reverseLastInput()', () => {
      it('should reverse last input ', () => {
        component.setState({
          lastInput: '22',
          calculation: '22'
        });

        instance.reverseLastInput();

        expect(instance.state.lastInput).toEqual('-22');
        expect(instance.state.calculation).toEqual('-22');
      });
    });
  });
});
