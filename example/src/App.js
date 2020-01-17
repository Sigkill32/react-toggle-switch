import React, { Component } from "react";
import { ToggleButton } from "react-toggle-button";

export default class App extends Component {
  state = {
    toggleState: false
  };

  handleChange = toggleState => {
    // this.setState({ toggleState });
    console.log(toggleState)
  };

  render() {
    const { toggleState } = this.state;
    return (
      <div>
        {/* <p>Do you like Pizzas: <span style={{color: toggleState ? 'blue' : 'red'}}>{toggleState ? 'YES' : 'NO'}</span></p> */}
        <ToggleButton onChange={this.handleChange} initState={true} buttonDesign='angled' buttonStates={3}/>
      </div>
    );
  }
}
