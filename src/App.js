import React from 'react';
import { render } from 'react-dom';

import Calculator from './container/Calculator';
import WithTheme from './components/theme/WithTheme';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <WithTheme>
          <Calculator />
        </WithTheme>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
