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
        <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='rounded'
          buttonStates={3}
          fontSize='12px'
        />
        <br></br>
        <ToggleButton
          onChange={this.handleChange}
          initState={true}
          buttonDesign='custom'
          textData={{ stateOne: 'YES', stateTwo: 'NO' }}
          buttonRadius={{container: '3px', slider: '12px'}}
        />
        <br></br>
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
