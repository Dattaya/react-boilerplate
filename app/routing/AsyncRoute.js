/**
 * A helper component that renders a Route that will asynchronously load a component only when the Route is
 * rendered. This allows for code-splitting.
 *
 * Inspired by https://reacttraining.com/react-router/web/guides/code-splitting
 */

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

/**
 * A wrapper component that will lazily render a component after it has been loaded.
 */
class Bundle extends Component {

  static contextTypes = {
    store: React.PropTypes.object,
    setLatestPath: React.PropTypes.func,
    setComponent: React.PropTypes.func,
    componentToRender: React.PropTypes.any,
  };

  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  /* istanbul ignore next */
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load({ load, path }) {
    const { setLatestPath, setComponent, store } = this.context;
    setLatestPath(path);

    load(store, (mod) => {
      setComponent(path, mod.default ? mod.default : mod);
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { load, ...otherProps } = this.props;
    return this.context.componentToRender && <this.context.componentToRender {...otherProps} />;
  }
}

Bundle.propTypes = {
  children: React.PropTypes.node,
  load: React.PropTypes.func,
};

const AsyncRoute = ({ load, path, ...others }) => (
  <Route
    {...others} path={path} render={(props) => (
      <Bundle load={load} path={path} {...props} />
  )}
  />
);

AsyncRoute.propTypes = {
  computedMatch: React.PropTypes.object,
  path: React.PropTypes.string,
  load: React.PropTypes.func,
};

export default AsyncRoute;
