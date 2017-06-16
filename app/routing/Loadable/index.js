import React, { PropTypes } from 'react';
import Loadable from 'react-loadable';

import { getAsyncInjectors } from 'utils/asyncInjectors';
import LoadingComponent from 'routing/LoadingComponent';

export default ({ loader, LoadingComponent: CustomLoadingComponent, ...rest }) =>
  class RbLoadable extends React.Component {
    static contextTypes = {
      store: PropTypes.object,
    };

    loaderWithAsyncInjectors = () => {
      if (loader) {
        return loader(getAsyncInjectors(this.context.store))
          .then((component) => component.default ? component.default : component);
      }
      return Promise.resolve(null);
    };

    loadableComponent = Loadable({
      ...rest,
      loader: this.loaderWithAsyncInjectors,
      LoadingComponent: CustomLoadingComponent || LoadingComponent,
    });

    render() {
      return <this.loadableComponent />;
    }
  };
