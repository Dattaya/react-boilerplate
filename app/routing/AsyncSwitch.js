import React from 'react';
import { Switch } from 'react-router-dom';

import FrozenComponentProvider from './FrozenComponentProvider';

class AsyncSwitch extends React.Component {
  render() {
    const { children, ...other } = this.props;

    return (
      <FrozenComponentProvider>
        <Switch {...other}>
          {children}
        </Switch>
      </FrozenComponentProvider>
    );
  }
}

export default AsyncSwitch;
