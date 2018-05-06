# Component meta data

component meta data helps us create automatics tests and tooling for the component.

every component in wix-ui-core must be registered with meta data.

## Registeration API

```tsx

import {registerMeta} from '../../tools/register-meta';
import {MyComponent} from './my-component';


registerMeta(MyComponent)
    .addSimulation('with short text',()=>{
        return {
            props:{
                text:'blah'
            }
        }
    })
    .addSimulation('opened with long text', ()=>{
        return {
            props:{
                text:'blah'
            },
            state:{
                opened:true
            }
        }
    })