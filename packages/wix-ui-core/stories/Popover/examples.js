export const simple = `
() => {
  const [shown, setShown] = React.useState(true)
  return (
    <Popover shown={() => setShown(!shown)}>
      <Popover.Element>The Element</Popover.Element>
      <Popover.Content>The content</Popover.Content>
    </Popover>
  )
}
`;
