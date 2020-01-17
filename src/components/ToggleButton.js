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
    const { initState, buttonStates, textData } = this.props
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
        this.setState(prevState => ({state: prevState.state + 1}))
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
    } else {
      if (classNames) {
        return `${styles.slider} ${styles.slideRight} ${classNames.slider}`
      } else return `${styles.slider} ${styles.slideRight}`
    }
  };

  getContainerWidth = () => {
    const { togglerWidth, buttonStates } = this.props
    if (!togglerWidth) {
      return {
        containerWidth: `${(SLIDER_WIDTH + 3) * buttonStates + 10}px`,
        sliderWidth: `${SLIDER_WIDTH}px`
      }
    } else return togglerWidth
  };

  render() {
    const { toggle } = this.state
    const {
      buttonDesign,
      textData,
      onColor,
      offColor,
      classNames,
      id,
      animation,
      buttonStates
    } = this.props

    return (
      <div
        className={
          classNames ? `${styles.outer} ${classNames.container}` : styles.outer
        }
        onClick={this.handleToggle}
        style={{
          backgroundColor: toggle ? '#d7e3e3' : '#fcebeb',
          width: this.getContainerWidth().containerWidth,
          borderRadius: buttonDesign === 'rounded' ? '20px' : '3px'
        }}
        id={id}
      >
        <div
          className={this.getSliderClassName()}
          style={{
            backgroundColor: toggle ? onColor : offColor,
            width: this.getContainerWidth().sliderWidth,
            borderRadius: buttonDesign === 'rounded' ? '50%' : '3px'
          }}
        >
          {buttonStates === 2 ? (
            <span>{toggle ? textData.stateOne : textData.stateTwo}</span>
          ) : (
            <span>3states</span>
          )}
        </div>
      </div>
    )
  }
}

ToggleButton.defaultProps = {
  buttonDesign: 'rounded',
  textData: { stateOne: 'YES', stateTwo: 'NO', stateThree: 'NA' },
  initState: true,
  onChange: null,
  onColor: '#03A9F4',
  offColor: '#f44336',
  classNames: null,
  id: `button-container-${Math.floor(Math.random() * 100000 + 1)}`,
  animation: { textDataVisibility: false, type: 'slide', duration: '0.3s' },
  togglerWidth: null,
  buttonStates: 2
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
  onColor: PropTypes.string,
  offColor: PropTypes.string,
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
  togglerWidth: PropTypes.shape({
    containerWidth: PropTypes.string,
    sliderWidth: PropTypes.string
  }),
  buttonStates: PropTypes.number
}

export default ToggleButton
