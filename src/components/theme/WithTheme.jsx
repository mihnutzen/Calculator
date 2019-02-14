import React from 'react';

import './theme.scss';

export default class WithTheme extends React.Component {
  displayName = 'themeForCalculator';

  render() {
    return (
      <div className={this.displayName}>
        <p className={`${this.displayName}__logo`}>
          <img
            src="https://equalexperts.github.io/img/eelogo.jpg"
            alt="Equal Experts"
          />
        </p>

        <h1 className={`${this.displayName}__title`}>The Calculator</h1>

        {this.props.children}
      </div>
    );
  }
}
