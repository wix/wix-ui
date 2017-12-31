import * as React from 'react';
import Divider from '../../src/components/Divider';

const horizontalDemo: React.CSSProperties = {
    width: '100px',
    border: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
};

const verticalDemo: React.CSSProperties = {
    width: '150px',
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid lightgray'
};

export class DividerStory extends React.PureComponent {
    render() {
        return <div>
                <h3>Horizontal Example:</h3>
                <div style={horizontalDemo}>
                    <p>Component 1</p>
                    <Divider dataHook="story-divider"/>
                    <p>Component 2</p>
                </div>
                <br/>
                <h3>Horizontal Example:</h3>
                <div style={verticalDemo}>
                    <p>West</p>
                    <Divider vertical/>
                    <p>East</p>
                </div>
            </div>;
    }
}
