export const size = `
<Layout cols={1}>
  <Input size="large" placeholder="Large" />
  <Input size="medium" placeholder="Medium" />
  <Input size="small" placeholder="Small" />
</Layout>;
`;

export const border = `
<Layout cols={1}>
  <Input border="default" placeholder="Default" />
  <Input border="round" placeholder="Round" />
  <Input border="bottomLine" placeholder="Bottom line" />
</Layout>;
`;

export const status = `
<Layout cols={1}>
  <Input status="error" placeholder="Error" />
  <Input status="warning" placeholder="Warning" />
  <Input status="loading" placeholder="Loading" />
</Layout>;
`;

export const statusMessage = `
<Input
  placeholder="Hover the mouse on status icon"
  status="error"
  statusMessage="Please fill the required field"
tooltipPlacement="top-end" 
/>;
`;

export const readOnlyAndDisabled = `
<Layout cols={1}>
  <Input readOnly defaultValue="Read Only" />
  <Input disabled defaultValue="Disabled" />
</Layout>;
`;

export const affix = `
<Layout cols={1}>
  <Input
    prefix={<Input.Affix>Prefix</Input.Affix>}
    suffix={<Input.Affix>Suffix</Input.Affix>}
    defaultValue="Value"
  />
  <Input
    prefix={
      <Input.IconAffix>
        <Icons.GitHub />
      </Input.IconAffix>
    }
    suffix={
      <Input.IconAffix>
        <TextButton>
          Button
        </TextButton>
      </Input.IconAffix>
    }
    defaultValue="Value"
  />
</Layout>;
`;

export const clearButton = `
() => {
  const [inputText, setInputText] = React.useState(
    'Click clear button to erase this value',
  );

  return (
    <Input
      value={inputText}
      clearButton
      onChange={e => setInputText(e.target.value)}
      onClear={() => setInputText('')}
    />
  );
};
`;

export const textOverflow = `
<Input
  textOverflow="ellipsis"
  border="bottomLine"
  defaultValue="The Life and Strange Surprizing Adventures of Robinson Crusoe, Of York, Mariner: Who lived Eight and Twenty Years, all alone in an un-inhabited Island on the Coast of America, near the Mouth of the Great River of Oroonoque; Having been cast on Shore by Shipwreck, wherein all the Men perished but himself. With An Account how he was at last as strangely deliver'd by Pyrates."
/>;
`;

export const compoundInput = `
() => {
  const [value, setValue] = React.useState('');
  
  const getDisplayValue = (value) => {
    const [, group1, group2, group3] = value.replace(/\\D/g, '').match(/(\\d{0,2})(\\d{0,3})(\\d{0,4})/);
    return (!group2 ? group1 : group1 + ' ') + group2 + (group3 ? '-' + group3 : '')
  }

  const options = [
    listItemSelectBuilder({ id: 0, title: 'Israel', suffix: '+972' }),
    listItemSelectBuilder({ id: 1, title: 'Japan', suffix: '+81' }),
    listItemSelectBuilder({ id: 2, title: 'Australia', suffix: '+61' }),
  ];
  
  const onChange = e => {
    const { value } = e.target;
    if(value.length < 12) {
      setValue(getDisplayValue(value));
    }
  }

  const renderAutoComplete = () => (
    <AutoComplete
      popoverProps={{ placement: 'bottom-start' }}
      value="+972"
      options={options}
    />
  );

  return (
    <FormField label="Phone number">
      <Layout gap={6}>
        <Cell span={2}>{renderAutoComplete()}</Cell>
        <Cell span={10}>
          <Input placeholder="00 000-0000" onChange={onChange} value={value}  />
        </Cell>
      </Layout>
    </FormField>
  );
};
`;

export const inputAsTitle = `
() => {
  const renderCard = (imageSrc, inputValue) => (
    <Card>
      <Box direction="vertical" padding="SP1 SP1 SP2">
        <Layout gap={12}>
          <Cell>
            <Box padding="6px 6px 0px">
              <Image borderRadius="4px" height="180px" src={imageSrc} />
            </Box>
          </Cell>

          <Cell>
            <Input
              border="bottomLine"
              textOverflow="ellipsis"
              defaultValue={inputValue}
            />
          </Cell>
        </Layout>
      </Box>
    </Card>
  );

  return (
    <Layout>
      <Cell span={6}>
        {renderCard('', 'Empty photo album')}
      </Cell>
      <Cell span={6}>
        {renderCard('example.jpg', 'Cooking recipes album')}
      </Cell>
    </Layout>
  );
}
`;
