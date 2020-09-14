import * as React from 'react';
import { Popover } from '../Popover';

const colors = ['#fff', '#c00'];

export class NestedPopoverTestFixture extends React.PureComponent {
  state = {
    clicked2: 0,
    clicked3: 0,
    clicked4: 0,
    clicked5: 0,
  };

  resetClicks = () => {
    this.setState({
      clicked2: 0,
      clicked3: 0,
      clicked4: 0,
      clicked5: 0,
    });
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.resetClicks);
  }

  render() {
    return (
      <div>
        <Popover
          appendTo="window"
          shown
          onClickOutside={() => this.setState({ clicked2: 1 })}
          showArrow
          placement="bottom"
          excludeClass="excludeClass"
        >
          <Popover.Element>
            <div
              style={{
                border: '1px solid black',
                height: '150px',
                width: '150px',
                fontSize: '35px',
              }}
            >
              1
            </div>
          </Popover.Element>
          <Popover.Content>
            <div
              style={{
                height: '120px',
                width: '120px',
                fontSize: '35px',
                background: colors[this.state.clicked2],
              }}
            >
              <Popover
                appendTo="window"
                shown
                onClickOutside={() => this.setState({ clicked3: 1 })}
                showArrow
                placement="bottom"
              >
                <Popover.Element>
                  <div
                    style={{
                      height: '120px',
                      width: '120px',
                      fontSize: '35px',
                      background: colors[this.state.clicked2],
                    }}
                  >
                    2
                  </div>
                </Popover.Element>
                <Popover.Content>
                  <div
                    style={{
                      height: '90px',
                      width: '90px',
                      fontSize: '35px',
                      background: colors[this.state.clicked3],
                    }}
                  >
                    <Popover
                      appendTo="window"
                      shown
                      onClickOutside={() =>
                        this.setState({
                          clicked4: 1,
                        })
                      }
                      showArrow
                      placement="bottom"
                    >
                      <Popover.Element>
                        <div
                          style={{
                            height: '90px',
                            width: '90px',
                            fontSize: '35px',
                            background: colors[this.state.clicked3],
                          }}
                        >
                          3
                        </div>
                      </Popover.Element>
                      <Popover.Content>
                        <div
                          style={{
                            height: '70px',
                            width: '70px',
                            fontSize: '35px',
                            background: colors[this.state.clicked4],
                          }}
                        >
                          <Popover
                            appendTo="window"
                            shown
                            onClickOutside={() =>
                              this.setState({
                                clicked5: 1,
                              })
                            }
                            showArrow
                            placement="bottom"
                          >
                            <Popover.Element>
                              <div
                                style={{
                                  height: '70px',
                                  width: '70px',
                                  fontSize: '35px',
                                  background: colors[this.state.clicked4],
                                }}
                              >
                                4
                              </div>
                            </Popover.Element>
                            <Popover.Content>
                              <div
                                style={{
                                  height: '40px',
                                  width: '40px',
                                  fontSize: '35px',
                                  background: colors[this.state.clicked5],
                                }}
                              >
                                5
                              </div>
                            </Popover.Content>
                          </Popover>
                        </div>
                      </Popover.Content>
                    </Popover>
                  </div>
                </Popover.Content>
              </Popover>
            </div>
          </Popover.Content>
        </Popover>

        <div style={{ marginLeft: '200px' }}>
          <div>Click on a square or outside</div>
          <br />
          <div>Clicked {this.state.clicked2 ? 'outside' : 'inside'} 2</div>
          <div>Clicked {this.state.clicked3 ? 'outside' : 'inside'} 3</div>
          <div>Clicked {this.state.clicked4 ? 'outside' : 'inside'} 4</div>
          <div>Clicked {this.state.clicked5 ? 'outside' : 'inside'} 5</div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.resetClicks);
  }
}
