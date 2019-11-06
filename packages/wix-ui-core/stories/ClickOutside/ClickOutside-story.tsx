import * as React from 'react';
import { ClickOutside } from '../../src/components/click-outside';

export class ClickOutsideStory extends React.Component<any, any> {
  private readonly rootRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.rootRef = React.createRef();

    this.state = {
      disableOnClickOutside: false,
      clicks: 0,
    };
  }

  _clickOutside = event => {
    const { clickOutsideCallback } = this.props;
    this.setState({ clicks: this.state.clicks + 1 });
    clickOutsideCallback();
  };

  render() {
    const { excludeClass } = this.props;
    return (
      <div>
        <ClickOutside
          rootRef={this.rootRef}
          onClickOutside={this._clickOutside}
          excludeClass={excludeClass}
          disableOnClickOutside={this.state.disableOnClickOutside}
        >
          <div
            style={{ backgroundColor: 'lightskyblue', padding: '5px' }}
            ref={this.rootRef}
          >
            Number of clicks outside this div: {this.state.clicks}
          </div>
        </ClickOutside>
      </div>
    );
  }
}
