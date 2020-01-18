import React, { Component } from 'react'
import styles from './styles.css'
import PropTypes from 'prop-types'

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

  getTransform = () => {
    const { buttonStates, togglerWidth } = this.props
    const { toggle, state } = this.state
    if (buttonStates === 3) {
      if (state === 2) return `translateX(${togglerWidth + 6}px)`
      if (state === 3) return `translateX(${(togglerWidth + 6) * 2}px)`
    } else {
      if (!toggle) return `translateX(${togglerWidth + 6}px)`
    }
    return ''
  }

  getContainerWidth = () => {
    const { togglerWidth, buttonStates } = this.props
    return {
      containerWidth: `${(togglerWidth + 6) * buttonStates}px`,
      sliderWidth: `${togglerWidth}px`
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

  getButtonRadius = () => {
    const { buttonDesign, buttonRadius } = this.props
    if (buttonDesign === 'rounded') return { slider: '50%', container: '20px' }
    if (buttonDesign === 'angled') return {slider: '3px', container: '3px'}
    if (buttonDesign === 'custom') return buttonRadius
  }

  render() {
    const {
      buttonDesign,
      classNames,
      id,
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
          borderRadius: this.getButtonRadius().container
        }}
        id={id}
      >
        <div
          className={classNames ? `${styles.slider} ${classNames.slider}` : styles.slider}
          style={{
            backgroundColor: this.getTheme().knob,
            width: this.getContainerWidth().sliderWidth,
            color: this.getTheme().color,
            borderRadius: this.getButtonRadius().slider,
            transform: this.getTransform()
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
  togglerWidth: 30,
  buttonStates: 2,
  fontSize: '10px',
  togglerTheme: [
    { knob: '#03A9F4', bg: '#d7e3e3', color: 'white' },
    { knob: '#f44336', bg: '#fcebeb', color: 'white' },
    { knob: '#fcba03', bg: '#fff0c7', color: 'white' }
  ],
  buttonRadius: null
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
  togglerTheme: PropTypes.array,
  buttonRadius: PropTypes.shape({
    container: PropTypes.string,
    slider: PropTypes.string
  })
}

export default ToggleButton
