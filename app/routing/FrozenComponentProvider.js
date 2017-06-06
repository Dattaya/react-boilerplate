import React from 'react';
import { Switch } from 'react-router-dom';

/**
 * Should wrap every `Switch` with async routes
 */
class FrozenComponentProvider extends React.Component {
  static childContextTypes = {
    componentToRender: React.PropTypes.any,
    setLatestPath: React.PropTypes.func,
    setComponent: React.PropTypes.func,
  };

  state = {
    componentToRender: null,
  };

  /**
   * We need to track latest path in addition to a component in case someone tries to navigate to one page, then
   * immediately to another and the first page's component loads **after** the second. It should be ignored and
   * second page's component should be shown.
   *
   * @param path String AsyncRoute's path. It's used to identify a route
   */
  setLatestPath = (path) => {
    this.latestPath = path;
  };

  setComponent = (path, component) => {
    if (this.latestPath === path) {
      this.setState({
        componentToRender: component
      });
    }
  };

  getChildContext = () => ({
    componentToRender: this.state.componentToRender,
    setLatestPath: this.setLatestPath,
    setComponent: this.setComponent,
  });

  render() {
    const { children } = this.props;

    return (
      React.Children.only(children)
    );
  }
}

export default FrozenComponentProvider;
