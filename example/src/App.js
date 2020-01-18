import React, { Component } from "react";
import { ToggleButton } from "react-toggle-button";

export default class App extends Component {
  state = {
    toggleState: false
  };

  handleChange = toggleState => {
    // this.setState({ toggleState });
    // console.log(toggleState)
  };

  render() {
    // const { toggleState } = this.state;
    return (
      <div style={{margin: '20px'}}>
        {/* <p>Do you like Pizzas: <span style={{color: toggleState ? 'blue' : 'red'}}>{toggleState ? 'YES' : 'NO'}</span></p> */}
        <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='rounded'
          buttonStates={3}
          fontSize='12px'
        />
        <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='custom'
          textData={{ stateOne: 'YES', stateTwo: 'NO' }}
          buttonRadius={{container: '3px', slider: '12px'}}
        />
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
