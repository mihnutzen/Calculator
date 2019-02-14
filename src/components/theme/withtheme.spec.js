import React from 'react';
import { shallow } from 'enzyme';

import WithTheme from './WithTheme';

describe('the <WithTheme /> component', () => {
  const getDefaultProps = () => ({});

  const setup = (props = {}) => {
    const componentProps = {
      ...getDefaultProps(),
      ...props
    };
    const component = shallow(<WithTheme {...componentProps} />);
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
        children: React.createElement('p', { className: 'test' }, 'test child')
      };
      const { component } = setup(inputProps);

      // then
      expect(component.find('h1').length).toBe(1);
      expect(component.find('p.test').length).toBe(1);
    });
  });
});
