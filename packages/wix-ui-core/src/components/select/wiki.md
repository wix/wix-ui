# `<Select/>`

a compound component for creating dropdowns. internally uses popper.js
and downshift. Naming tries to be close to HTML.

dropdown (select/pop/autocomplete, whatever we call it) is most often made out of two items:
- toggle (button, input, icon)
- menu (container for items)

we already have components for toggle part
we need component for menu and their items part
we need component that composes the two, manages state, a11y, keyboard navigation etc.

---

some examples from consumer perspective:

```js
// simple, just click to open and choose item
<Select
  onChange={item => console.log(item)}
>
  <Option value={0}>zero</Option>
  <Option value={1} selected>one</Option>
</Select>
```

```js
// simple, but custom toggle
<Select
  onChange={item => console.log(item)}
  toggle={({ toggleMenu, selectedOption }) =>
    <ToggleSwitch onChange={toggleMenu} />
  }
>
  <Option value={0}>zero</Option>
  <Option value={1}>one</Option>
</Select>
```

```js
// simple, indicate selected, can be multiple
<Select
  onChange={items => console.log(...items)}
>
  <Option value={0}>zero</Option>
  <Option value={1} selected>one</Option>
  <Option value={2} selected>two</Option>
</Select>
```

```js
// toggle as input, filtering is done internally but possible to configure
<Select
  onChange={console.log}
  toggle={({getInputProps, openMenu}) => (
    <Input {...getInputProps()} onFocus={openMenu} />
  )}
>
  <Option value={0}>zero</Option>
  <Option value={1} selected>one</Option>
  <Option value={2} selected disabled>two</Option>
</Select>
```

```js
// consumers shouldn't need to care about configuring `toggle` for input, so we can expose abstracted version
<SelectInput
  onChange={console.log}
>
  <Option value={0}>zero</Option>
  <Option value={1} selected>one</Option>
  <Option value={2} selected disabled>two</Option>
</SelectInput>
```

---

EmptyState through prop

```js
// with input, for autocomplete
<SelectInput
  onChange={console.log}
  emptyState={<EmptyState title="dang it, found nothing :("/>}
>
    { options.map(option => <Option {...option}/>) }
</Select>
```

---

open questions:
* status (loading, error, warning, info). how to allow configuration without apropcalypse
* lazyload
