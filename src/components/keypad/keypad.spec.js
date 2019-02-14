import React from 'react';
import { shallow } from 'enzyme';

import Keypad from './Keypad';

import { utils, CLEAR, PLUSMINUS, PERC } from '../../data/data';

describe('the <Keypad /> component', () => {
  const getDefaultProps = () => ({
    elements: [],
    onInteraction: () => {}
  });

  const setup = (props = {}) => {
    const componentProps = {
      ...getDefaultProps(),
      ...props
    };
    const component = shallow(<Keypad {...componentProps} />);
    const instance = component.instance();

    return {
      component,
      componentProps,
      instance
    };
  };

  describe('Rendering', () => {
    it('should exist', () => {
      const { component } = setup();
      expect(component.exists()).toBeTruthy();
    });

    it('should render the elements correctly', () => {
      // given
      const inputProps = {
        elements: [...utils],
        onInteraction: jest.fn()
      };
      const { component } = setup(inputProps);

      // then
      expect(component.find('button').length).toBe(3);
      expect(component.find('button').get(0).props['data-key']).toBe(CLEAR);
      expect(component.find('button').get(1).props['data-key']).toBe(PLUSMINUS);
      expect(component.find('button').get(2).props['data-key']).toBe(PERC);
    });
  });

  describe('Actions', () => {
    it('should trigger action when clicked', () => {
      // given
      const inputProps = {
        elements: [...utils],
        onInteraction: jest.fn()
      };
      const { component } = setup(inputProps);

      // when
      component
        .find(`button[data-key="${CLEAR}"]`)
        .simulate('click', { target: { dataset: { key: CLEAR } } });

      // then
      expect(inputProps.onInteraction).toHaveBeenCalledWith(CLEAR);
    });
  });
});
