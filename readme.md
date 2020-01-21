# react-toggle-switch

> TODO: Component Description

[![NPM](https://img.shields.io/npm/v/react-toggle-switch.svg)](https://www.npmjs.com/package/react-toggle-switch) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img src="./toggler-demo.gif" />

## Install

```bash
npm install --save react-toggle-switch
```

## Documentation

Read the full Documentation [here](https://react-multistate-toggler-demo.netlify.com)

## Advantages

Create highly customizable toggle switches with ease. Create toggle switches with 3 states.

## Usage

### Basic usage

```jsx
import React, { Component } from "react";
import ToggleButton from "react-multistate-toggler";

export default class App extends Component {
  state = {
    toggleState: null
  };

  handleChange = toggleState => {
    this.setState({ toggleState });
  };

  render() {
    const { toggleState } = this.state;
    return (
      <div>
        <p>Do you like Pizzas: <span style={{color: toggleState ? 'blue' : 'red'}}>{toggleState ? 'YES' : 'NO'}</span></p>
         <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='angled'
          textData={{ stateOne: 'YES', stateTwo: 'NO' }}
        />
      </div>
    );
  }
}
```

### Creating toggle button with 3 states

```jsx
import React, { Component } from "react";
import ToggleButton from "react-multistate-toggler";

export default class App extends Component {
  state = {
    toggleState: false
  };

  handleChange = toggleState => {
    this.setState({ toggleState });
  };

  render() {
    return (
      <div>
        <p>Choose your gender <span>{this.state.toggleState}</span></p>
        <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='rounded'
          buttonStates={3}
          fontSize='12px'
          textData={ stateOne: 'M', stateTwo: 'F', stateThree: 'T' }
        />
      </div>
    );
  }
}
```

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
