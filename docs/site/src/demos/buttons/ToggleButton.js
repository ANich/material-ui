// @flow weak

import React, { Component, PropTypes } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'material-ui/ToggleButton';

export default class ToggleButtons extends Component {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    bold: false,
    underlined: true,
    italic: false,
  }

  render() {
    return (
      <ToggleButtonGroup>
        <ToggleButton
          active={this.state.bold}
          onClick={() => this.setState({
            bold: !this.state.bold,
          })}
        >
         format_bold
        </ToggleButton>
        <ToggleButton
          active={this.state.underlined}
          onClick={() => this.setState({
            underlined: !this.state.underlined,
          })}
        >
         format_underline
        </ToggleButton>
        <ToggleButton
          active={this.state.italic}
          onClick={() => this.setState({
            italic: !this.state.italic,
          })}
          disabled
        >
         format_italic
        </ToggleButton>
      </ToggleButtonGroup>
   );
  }
}
