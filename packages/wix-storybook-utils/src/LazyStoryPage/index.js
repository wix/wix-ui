import PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import StoryPage from '../StoryPage';

// const StoryPage = lazy(() => import('../StoryPage'));

class LazyStoryPage extends React.Component {
  state = {
    isLoaded: false
  };

  componentDidMount() {
    this.loadDefinition();
  }

  loadDefinition() {
    this.props.definitionImport.then(
      (x) => this.setState({
        config: x.default,
        isLoaded: true
      })
    );
  }

  render() {
    if (this.state.isLoaded) {
      const { _config, _metadata, ...storyConfig } = this.state.config;
      return (
        <Suspense fallback={<div>Loading</div>}>
          <StoryPage {...storyConfig} metadata={_metadata} config={_config} />
        </Suspense>
      );
    }
    return <div>Loading</div>;
  }
}

LazyStoryPage.propTypes = {
  definitionImport: PropTypes.object.isRequired
};

export default LazyStoryPage;
