import * as React from 'react';

const enum ComponentEnum {
  basic = 'basic',
  special = 'special',
}

interface ComponentProps {
  enumProp: ComponentEnum;
}

/** Component Description from source! */
export class Component extends React.Component<ComponentProps> {
  static displayName = 'Component';

  render() {
    const { enumProp } = this.props;
    let content;

    // tslint:disable-next-line:switch-default
    switch (enumProp) {
      case ComponentEnum.basic:
        content = (
          <div style={{ backgroundColor: 'moccasin', color: 'skyblue' }}>
            Basic
          </div>
        );
        break;
      case ComponentEnum.special:
        content = (
          <div style={{ backgroundColor: 'skyblue', color: 'moccasin' }}>
            Special
          </div>
        );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
