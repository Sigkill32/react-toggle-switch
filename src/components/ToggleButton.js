import React, { Component } from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

const SLIDER_WIDTH = 30

class ToggleButton extends Component {
  state = {
    toggle: true,
    state: 1
  };

  componentDidMount() {
    const { initState, buttonStates } = this.props
    if (buttonStates === 2) this.setState({ toggle: initState })
    else this.setState({ state: 1 })
  }

  handleToggle = () => {
    const { onChange, buttonStates } = this.props
    const { toggle, state } = this.state
    if (buttonStates === 2) {
      onChange(!toggle)
      this.setState(prevState => ({ toggle: !prevState.toggle }))
    } else {
      if (state === 3) {
        this.setState({ state: 1 })
        onChange(1)
      } else {
        onChange(state + 1)
        this.setState(prevState => ({ state: prevState.state + 1 }))
      }
    }
  };

  getSliderClassName = () => {
    const { classNames } = this.props
    const { toggle } = this.state
    if (toggle) {
      if (classNames) return `${styles.slider} ${classNames.slider}`
      else return `${styles.slider}`
    } else {
      if (classNames) {
        return `${styles.slider} ${styles.slideRight} ${classNames.slider}`
      } else return `${styles.slider} ${styles.slideRight}`
    }
  };

  get3StateSliderClassName = () => {
    const { classNames } = this.props
    const { state } = this.state
    if (state === 1) {
      if (classNames) return `${styles.slider} ${classNames.slider}`
      else return `${styles.slider}`
    }
    if (state === 2) {
      if (classNames) {
        return `${styles.slider} ${styles.slideRight} ${classNames.slider}`
      } else return `${styles.slider} ${styles.slideRight}`
    }
    if (state === 3) {
      if (classNames) {
        return `${styles.slider} ${styles.slideRight} ${classNames.slider}`
      } else { return `${styles.slider} ${styles.slideRight} ${styles.slideThirdRight}` }
    }
  };

  getContainerWidth = () => {
    const { togglerWidth, buttonStates } = this.props
    if (!togglerWidth) {
      return {
        containerWidth: `${(SLIDER_WIDTH + 6) * buttonStates}px`,
        sliderWidth: `${SLIDER_WIDTH}px`
      }
    } else {
      return {
        containerWidth: `${(togglerWidth + 6) * buttonStates}px`,
        sliderWidth: `${togglerWidth}px`
      }
    }
  };

  getDataText = () => {
    const { state, toggle } = this.state
    const { textData, buttonStates } = this.props
    if (buttonStates === 2) {
      if (toggle) return textData.stateOne
      else return textData.stateTwo
    }
    if (state === 1) return textData.stateOne
    if (state === 2) return textData.stateTwo
    if (state === 3) return textData.stateThree
  };

  getTheme = () => {
    const { togglerTheme, buttonStates } = this.props
    const { state, toggle } = this.state
    if (buttonStates === 3) {
      for (let i = 0; i < 3; i += 1) if (state === i + 1) return togglerTheme[i]
    } else {
      if (toggle) return togglerTheme[0]
      else return togglerTheme[1]
    }
  }

  render() {
    const {
      buttonDesign,
      classNames,
      id,
      buttonStates,
      fontSize
    } = this.props

    return (
      <div
        className={
          classNames ? `${styles.outer} ${classNames.container}` : styles.outer
        }
        onClick={this.handleToggle}
        style={{
          backgroundColor: this.getTheme().bg,
          width: this.getContainerWidth().containerWidth,
          borderRadius: buttonDesign === 'rounded' ? '20px' : '3px'
        }}
        id={id}
      >
        <div
          className={
            buttonStates === 2
              ? this.getSliderClassName()
              : this.get3StateSliderClassName()
          }
          style={{
            backgroundColor: this.getTheme().knob,
            width: this.getContainerWidth().sliderWidth,
            color: this.getTheme().color,
            borderRadius: buttonDesign === 'rounded' ? '50%' : '3px'
          }}
        >
          <span style={{ fontSize: fontSize }}>{this.getDataText()}</span>
        </div>
      </div>
    )
  }
}

ToggleButton.defaultProps = {
  buttonDesign: 'rounded',
  textData: { stateOne: '1', stateTwo: '2', stateThree: '3' },
  initState: true,
  onChange: null,
  classNames: null,
  id: `button-container-${Math.floor(Math.random() * 100000 + 1)}`,
  animation: { textDataVisibility: false, type: 'slide', duration: '0.3s' },
  togglerWidth: null,
  buttonStates: 2,
  fontSize: '10px',
  togglerTheme: [
    { knob: '#03A9F4', bg: '#d7e3e3', color: 'white' },
    { knob: '#f44336', bg: '#fcebeb', color: 'white' },
    { knob: '#fcba03', bg: '#fff0c7', color: 'white' }
  ]
}

ToggleButton.propTypes = {
  buttonDesign: PropTypes.string,
  textData: PropTypes.shape({
    stateOne: PropTypes.string,
    stateTwo: PropTypes.string,
    stateThree: PropTypes.string
  }),
  initState: PropTypes.bool,
  onChange: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    slider: PropTypes.string
  }),
  id: PropTypes.string,
  animation: PropTypes.shape({
    textDataVisibility: PropTypes.bool,
    buttonDesign: PropTypes.string,
    duration: PropTypes.string
  }),
  togglerWidth: PropTypes.number,
  buttonStates: PropTypes.number,
  fontSize: PropTypes.string,
  togglerTheme: PropTypes.array
}

export default ToggleButton
