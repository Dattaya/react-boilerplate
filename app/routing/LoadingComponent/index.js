import React from 'react';

import { errorLoading } from 'utils/asyncInjectors';

export default class LoadingComponent extends React.Component {
  static propTypes = {
    pastDelay: React.PropTypes.bool,
  };

  static contextTypes = {
    registerLoadingComponent: React.PropTypes.func,
    unregisterLoadingComponent: React.PropTypes.func,
  };

  componentWillReceiveProps({ isLoading, pastDelay, error }) {
    if (isLoading && this.props.pastDelay === false && pastDelay === true) {
      this.context.registerLoadingComponent(this);
    }
    if (!isLoading && error) {
      errorLoading(error);
    }
  }

  componentWillUnmount() {
    this.context.unregisterLoadingComponent(this);
  }

  render() {
    return null;
  }
}
