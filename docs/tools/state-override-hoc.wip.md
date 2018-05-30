# State override HOC (WIP)

this useful utility wraps a component allowing its state to be overriden, this is usefull for visual tests and editing interaction.

## Usage

```tsx

import stateOverrider from '../tools/state-overrider';
import {SomeComp, SomeCompProps} from './some-comp'

const Wrapped = stateOverrider(SomeComp);

//will render a drop down thats always opened
export const RenderOpened = (props:SomeCompProps)=>{
    return <Wrapped {...props} stateOverride={{opened:true}}/>
}



```