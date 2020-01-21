import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

class ToggleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
      state: 1,
    };
  }

  componentDidMount() {
    const { initState, buttonStates } = this.props;
    if (buttonStates === 2) {
      if (initState !== undefined) this.setState({ toggle: initState });
      else this.setState({ toggle: true });
    }

    if (buttonStates === 3) {
      if (initState !== undefined) this.setState({ state: initState });
      else this.setState({ state: 1 });
    }
  }

  handleToggle = () => {
    const { onChange, buttonStates } = this.props;
    const { toggle, state } = this.state;
    if (buttonStates === 2) {
      onChange(!toggle);
      this.setState((prevState) => ({ toggle: !prevState.toggle }));
    } else if (state === 3) {
      this.setState({ state: 1 });
      onChange(1);
    } else {
      onChange(state + 1);
      this.setState((prevState) => ({ state: prevState.state + 1 }));
    }
  };

  getTransform = () => {
    const { buttonStates, togglerWidth } = this.props;
    const { toggle, state } = this.state;
    if (buttonStates === 3) {
      if (state === 2) return `translateX(${togglerWidth + 6}px)`;
      if (state === 3) return `translateX(${(togglerWidth + 6) * 2}px)`;
    } else if (!toggle) return `translateX(${togglerWidth + 6}px)`;
    return '';
  };

  getContainerWidth = () => {
    const { togglerWidth, buttonStates } = this.props;
    return {
      containerWidth: `${(togglerWidth + 6) * buttonStates}px`,
      sliderWidth: `${togglerWidth}px`,
    };
  };

  getDataText = () => {
    const { state, toggle } = this.state;
    const { textData, buttonStates } = this.props;
    if (buttonStates === 2) {
      if (toggle) return textData.stateOne;
      return textData.stateTwo;
    }
    if (state === 1) return textData.stateOne;
    if (state === 2) return textData.stateTwo;
    if (state === 3) return textData.stateThree;
    return null;
  };

  getTheme = () => {
    const { togglerTheme, buttonStates } = this.props;
    const { state, toggle } = this.state;
    if (buttonStates === 3) {
      return togglerTheme[state - 1];
    } else {
      if (toggle) return togglerTheme[0];
      return togglerTheme[1];
    }
  };

  getButtonRadius = () => {
    const { buttonDesign, buttonRadius } = this.props;
    if (buttonDesign === 'rounded') return { slider: '50%', container: '20px' };
    if (buttonDesign === 'angled') return { slider: '3px', container: '3px' };
    if (buttonDesign === 'custom') return buttonRadius;
    return null;
  };

  render() {
    const {
      classNames, id, fontSize, overrideInternalStyles,
    } = this.props;

    return (
      <div
        className={
          classNames ? `${styles.outer} ${classNames.container}` : styles.outer
        }
        onClick={this.handleToggle}
        style={
          overrideInternalStyles
            ? null
            : {
              backgroundColor: this.getTheme().bg,
              width: this.getContainerWidth().containerWidth,
              borderRadius: this.getButtonRadius().container,
            }
        }
        id={id}
      >
        <div
          className={
            classNames ? `${styles.slider} ${classNames.slider}` : styles.slider
          }
          style={
            overrideInternalStyles
              ? null
              : {
                backgroundColor: this.getTheme().knob,
                width: this.getContainerWidth().sliderWidth,
                color: this.getTheme().color,
                borderRadius: this.getButtonRadius().slider,
                transform: this.getTransform(),
              }
          }
        >
          <span style={{ fontSize }}>{this.getDataText()}</span>
        </div>
      </div>
    );
  }
}

ToggleButton.defaultProps = {
  buttonDesign: 'rounded',
  textData: { stateOne: '1', stateTwo: '2', stateThree: '3' },
  initState: undefined,
  onChange: null,
  classNames: null,
  id: `button-container-${Math.floor(Math.random() * 100000 + 1)}`,
  togglerWidth: 30,
  buttonStates: 2,
  fontSize: '10px',
  togglerTheme: [
    { knob: '#03A9F4', bg: '#d7e3e3', color: 'white' },
    { knob: '#f44336', bg: '#fcebeb', color: 'white' },
    { knob: '#fcba03', bg: '#fff0c7', color: 'white' },
  ],
  buttonRadius: null,
  overrideInternalStyles: false,
};

ToggleButton.propTypes = {
  buttonDesign: PropTypes.string,
  textData: PropTypes.shape({
    stateOne: PropTypes.string,
    stateTwo: PropTypes.string,
    stateThree: PropTypes.string,
  }),
  initState: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    slider: PropTypes.string,
  }),
  id: PropTypes.string,
  togglerWidth: PropTypes.number,
  buttonStates: PropTypes.number,
  fontSize: PropTypes.string,
  togglerTheme: PropTypes.arrayOf(
    PropTypes.shape({
      knob: PropTypes.string,
      bg: PropTypes.string,
      color: PropTypes.string,
    }),
  ),
  buttonRadius: PropTypes.shape({
    container: PropTypes.string,
    slider: PropTypes.string,
  }),
  overrideInternalStyles: PropTypes.bool,
};

export default ToggleButton;
