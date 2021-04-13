export const _structure = `() => {
  const [state, setState] = React.useState({ selectedId: null });
  const toggleSelection = selectedId => setState({ selectedId });
  return (
    <Radio
    label="Radio Label"
    checked={state.selectedId === 1}
    onChange={() => toggleSelection(1)}
    />
  );
};`;

export const _states = `<Layout cols={1}>
  <Radio label="Default" />
  <Radio label="Checked" checked />
  <Radio label="Disabled" disabled />
  </Layout>;`;

export const _label = `<Radio
  label={
    <Cell>
      <Heading appearance="H4">Free Plan</Heading>
      <Text size="small" secondary>
        {' '}
        Offer your plan free of charge.
      </Text>
    </Cell>
  }
/>`;

export const _alignment = `<Radio
  alignItems='top'
  label={
    <Cell>
      <Heading appearance="H4">Free Plan</Heading>
      <Text size="small" secondary>
        Offer your plan free of charge
      </Text>
    </Cell>
  }
/>`;

export const _advancedRadioGroup = `() => {
  const [state, setState] = React.useState({ selectedId: null });
  const toggleSelection = selectedId => setState({ selectedId });
  return (
    <Layout cols={1} gap="12px">
      <Radio
        label="Option 1"
        checked={state.selectedId === 1}
        onChange={() => toggleSelection(1)}
      />
      <Radio
        label="Option 2"
        checked={state.selectedId === 2}
        onChange={() => toggleSelection(2)}
      />
      <Radio
        label="Option 3"
        checked={state.selectedId === 3}
        onChange={() => toggleSelection(3)}
      />
    </Layout>
  );
};`;

export const _advancedCustomSelection = `<Layout cols={1} gap="12px">
  <Card>
    <Card.Content>
      <Radio
        label={
          <Cell>
            <Heading appearance="H4">Free Plan</Heading>
            <Text size="small" secondary>
              Offer your plan free of charge
            </Text>
          </Cell>
        }
      />
    </Card.Content>
  </Card>
  <Card>
    <Card.Content>
      <Radio
        label={
          <Cell>
            <Heading appearance="H4">One Time Payment</Heading>
            <Text size="small" secondary>
              Charge a single upfront fee
            </Text>
          </Cell>
        }
      />
    </Card.Content>
  </Card>
  <Card>
    <Card.Content>
      <Radio
        label={
          <Cell>
            <Heading appearance="H4">Recurring Payment</Heading>
            <Text size="small" secondary>
              Charge a weekly, monthly or yearly fee
            </Text>
          </Cell>
        }
      />
    </Card.Content>
  </Card>
</Layout>;`;
