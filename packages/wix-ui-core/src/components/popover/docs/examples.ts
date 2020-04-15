export const simple = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <Popover shown={shown} onClick={() => setShown(!shown)} placement="top" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
  )
}
`;

export const placement = `
() => {
  const [placement, setPlacement] = React.useState(0);
  const VALID_PLACEMENTS =  ['auto-start'
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

  React.useEffect(() => {
    setTimeout(() => setPlacement((placement + 1) % VALID_PLACEMENTS.length), 1000)
  }, [placement])

  return (
    <Popover shown flip={false} placement={VALID_PLACEMENTS[placement]} showArrow>
      <Popover.Element><div style={{ width: '100px', height: '50px',  backgroundColor: 'lightgray'}}/></Popover.Element>
      <Popover.Content>{VALID_PLACEMENTS[placement]}</Popover.Content>
    </Popover>
  )
}
`;

export const moveBy = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <Popover shown={shown} onClick={() => setShown(!shown)} moveBy={{ x: 50, y: 100 }} placement="right" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
  )
}
`;

export const fluid = `
() => {
  return (
  <div style={{ display: 'flex'}}>
    <div style={{ width: '50%', border: '1px solid black'}} >
      <Popover shown placement="top" showArrow>
        <Popover.Element><ButtonNext style={{ width: '100%' }}>inline</ButtonNext></Popover.Element>
        <Popover.Content>The content</Popover.Content>
      </Popover>
    </div>
    <div style={{ width: '50%', border: '1px solid black', marginLeft: '15px'}} >
      <Popover shown placement="top" showArrow fluid>
        <Popover.Element><ButtonNext style={{ width: '100%' }}>fluid</ButtonNext></Popover.Element>
        <Popover.Content>The content</Popover.Content>
      </Popover>
    </div>
  </div>
  )
}
`;

export const zIndex = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <div>
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'block', position: 'relative', width: '50%', marginRight: '30px', height: '50px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '0px' }}>
          <Popover
            shown={shown}
            flip={false}
            fixed={true}
            onClick={() => setShown(!shown)}
            placement="top"
          >
            <Popover.Element>The Element</Popover.Element>
            <Popover.Content>zIndex 1000</Popover.Content>
          </Popover>
        </div>
        <div
          style={{
            zIndex: 2000,
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: 'lightgray',
            width: '150px',
            height: '50px',
          }}
        >
        zIndex 2000
        </div>
      </div>
      <div style={{ display: 'block', position: 'relative', width: '50%', height: '50px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '0px' }}>
          <Popover
            shown={shown}
            zIndex={3000}
            flip={false}
            fixed={true}
            onClick={() => setShown(!shown)}
            placement="top"
          >
            <Popover.Element>The Element</Popover.Element>
            <Popover.Content>zIndex 3000</Popover.Content>
          </Popover>
        </div>
        <div
          style={{
            zIndex: 2000,
            position: 'absolute',
            top: '0px',
            left: '0px',
            backgroundColor: 'lightgray',
            width: '150px',
            height: '50px',
          }}
        >
          zIndex 2000
        </div>
      </div>
    </div>
  </div>
  )

}
`;

export const flip = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <div
   
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
  >
    <div
    style={{
      overflow: 'auto',
      height: '100px',
      zIndex: '15',
    }}
  >
    <ul>
      <li>item</li>
      <Popover flip={true} fixed={false} zIndex={1} shown={shown} onClick={() => setShown(!shown)} placement="top" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </div>
  </div>
  )
}
`;

export const fixed = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
  >
    <div
    style={{
      overflow: 'auto',
      height: '100px',
      zIndex: '15',
    }}
  >
    <ul>
      <li>item</li>
      <Popover flip={false} fixed={true} zIndex={1} shown={shown} onClick={() => setShown(!shown)} placement="top" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </div>
  </div>
  )
}
`;

export const window = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <Popover appendTo="window" shown={shown} onClick={() => setShown(!shown)} placement="right" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
  )
}
`;

export const scrollParent = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
  >
    <div
    style={{
      overflow: 'auto',
      height: '100px',
      zIndex: '15',
    }}
  >
    <ul>
      <li>item</li>
      <Popover zIndex={1} appendTo="scrollParent" shown={shown} onClick={() => setShown(!shown)} placement="right" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </div>
  </div>
  )
}
`;

export const viewPort = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <Popover appendTo="viewport" shown={shown} onClick={() => setShown(!shown)} placement="top" showArrow>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>I am attached to viewport</Popover.Content>
    </Popover> 
  )
}
`;

export const predicate = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <div data-hook="hello" style={{ padding: '15px', overflow: 'hidden', position: 'relative', border: '1px solid black' }}>
      <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid black',
      }}
    >
      <div
      style={{
        overflow: 'auto',
        height: '100px',
        zIndex: '15',
      }}
    >
      <ul>
        <li>item</li>
        <Popover 
            appendTo={elm => elm.getAttribute('data-hook') === 'hello'} 
            shown={shown} onClick={() => setShown(!shown)} 
            placement="right" 
            showArrow
        >
        <Popover.Element>The Element</Popover.Element>
        <Popover.Content>The content</Popover.Content>
      </Popover>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
    </div>
    </div>
  </div>
  )
}
`;
