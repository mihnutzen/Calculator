import React from 'react';
import { shallow } from 'enzyme';

import Display from './Display';

describe('the <Display /> component', () => {
  const getDefaultProps = () => ({
    calculation: '',
    current: ''
  });

  const setup = (props = {}) => {
    const componentProps = {
      ...getDefaultProps(),
      ...props
    };
    const component = shallow(<Display {...componentProps} />);
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

    it('should render the current value correctly', () => {
      const inputProps = {
        calculation: '1+2+3',
        current: '3'
      };
      const { component } = setup(inputProps);
      expect(component.find('div').text()).toEqual('3');
    });

    it('should render the result', () => {
      const { component } = setup();
      component.setProps({
        current: '',
        calculation: '1+2+3'
      });

      expect(component.find('div').text()).toEqual('6');
    });
  });
});
