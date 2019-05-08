export const basic = `
<div style={{ display: 'flex', justifyContent: 'center'}}>
  <Tooltip upgrade appendTo="window" content="Enter your postal code, so postman can easier send you a mail.">
    Hover me
  </Tooltip>
</div>
`;

export const placements = `
class PlacementExample extends React.Component {

  constructor() {
    super();
    this.state = { placement: 0 };
    this.changeDirection = this.changeDirection.bind(this);
    this.VALID_PLACEMENTS =  ['auto-start'
    , 'auto'
    , 'auto-end'
    , 'top-start'
    , 'top'
    , 'top-end'
    , 'right-start'
    , 'right'
    , 'right-end'
    , 'bottom-end'
    , 'bottom'
    , 'bottom-start'
    , 'left-end'
    , 'left'
    , 'left-start' ]
  }

  changeDirection() {
    this.setState({
      placement: (this.state.placement + 1) % this.VALID_PLACEMENTS.length,
    });
  };

  render() {
    const placement = this.VALID_PLACEMENTS[this.state.placement];
    return (
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Tooltip upgrade content={placement} placement={placement} appendTo="window">
          <ButtonNext onClick={this.changeDirection}>Click me to change the placement</ButtonNext>
        </Tooltip>
      </div>
    );
  }
}
`;

export const delay = `
<div style={{ display: 'flex', justifyContent: 'center'}}>
  <Tooltip upgrade showDelay={350} hideDelay={350} appendTo="window" content="Lagging...">
    Hover me
  </Tooltip>
</div>
`;

export const flip = `
class TooltipFlip extends React.Component {

  render() {
    return ( 
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%' }} >
            <Tooltip upgrade appendTo="scrollParent" content="I am here">
              <ButtonNext size="small">
                Focus
              </ButtonNext>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const flipnot = `
class TooltipFlip extends React.Component {

  render() {
    return ( 
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120,
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <Tooltip upgrade flip={false} appendTo="scrollParent" content="I am here">
            <ButtonNext size="small">
               Focus
            </ButtonNext>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const fixed = `
class TooltipFixed extends React.Component {

  render() {
    return ( 
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120,
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <Tooltip upgrade fixed appendTo="scrollParent" content="I am here">
            <ButtonNext fullWidth size="small">
               Focus
            </ButtonNext>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const parent = `
<div style={{ display: 'flex', justifyContent: 'center'}}>
  <Tooltip upgrade appendTo="parent" content="Enter your postal code, so postman can easier send you a mail.">
    <ButtonNext>Parent</ButtonNext>
  </Tooltip>
</div>
`;

export const window = `
<div style={{ display: 'flex', justifyContent: 'center'}}>
  <Tooltip upgrade appendTo="window" content="Enter your postal code, so postman can easier send you a mail.">
    <ButtonNext>Window</ButtonNext>
  </Tooltip>
</div>
`;

export const viewport = `
<div style={{ display: 'flex', justifyContent: 'center'}}>
  <Tooltip upgrade appendTo="viewport" content="Enter your postal code, so postman can easier send you a mail.">
    <ButtonNext>Viewport</ButtonNext>
  </Tooltip>
</div>
`;

export const scrollParent = `
class TooltipFixed extends React.Component {

  render() {
    return ( 
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 50,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ padding: '15px 25px 20px' }}>
          <Tooltip upgrade fixed appendTo="scrollParent" content="I am here">
            <ButtonNext size="small">
               ScrollParent
            </ButtonNext>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const a11y = `
<div style={{ display: 'flex', justifyContent: 'space-around'}}>
  <Tooltip content="i am tooltip"><button>native</button></Tooltip>
  <Tooltip content="i am tooltip"><ButtonNext>focusableHOC</ButtonNext></Tooltip>
</div>
`;

export const arrow = `
<div style={{ display: 'flex', justifyContent: 'space-around'}}>
  <Tooltip content="i am tooltip"><button>with arrow</button></Tooltip>
  <Tooltip content="i am tooltip" showArrow={false}><ButtonNext>without the arrow</ButtonNext></Tooltip>
</div>
`;
