import * as React from 'react';
import {InputWithOptions} from '../InputWithOptions';
import {Option, OptionFactory} from '../../baseComponents/DropdownOption';

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

export interface GoogleInputProps {
  initialInputValue?: string;
  onSelect: (address: string) => void;
}

export interface GoogleInputState {
  inputValue: string;
}

export class GoogleInput extends React.PureComponent<GoogleInputProps, GoogleInputState> {
  constructor(props: GoogleInputProps) {
    super(props);

    this.state = {
      inputValue: props.initialInputValue || ''
    };

    this.onSelect = this.onSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  setValue(value: string) {
    this.setState({
      inputValue: value
    });

    const {onSelect} = this.props;
    onSelect(value);
  }

  onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setValue(event.target.value);
  }

  onSelect(option: Option) {
    this.setValue(option.value);
  }

  render() {
    const {inputValue} = this.state;
    const lowerValue = inputValue.toLowerCase();
    const displayedOptions =
      fruit
        .filter((x: string) => x.toLowerCase().includes(lowerValue))
        .map((value: string, index: number) =>
          OptionFactory.createHighlighted(OptionFactory.create(index, false, true, value), inputValue));

    return (
      <InputWithOptions
        onSelect={this.onSelect}
        options={displayedOptions}
        inputProps={{
          value: inputValue,
          onChange: this.onInputChange
        }}
      />
    );
  }
}
