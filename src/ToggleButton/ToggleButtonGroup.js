// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import classNames from 'classnames';
import Paper from '../Paper';
import ToggleButton from './ToggleButton';

export const styleSheet = createStyleSheet('ToggleButtonGroup', (theme) => {
  const { palette } = theme;
  const dividerColor = palette.grey[500];

  return {
    root: {
      borderRadius: 4,
    },
    firstButton: {
      borderRadius: '4px 0 0 4px',
    },
    lastButton: {
      borderRadius: '0 4px 4px 0',
    },
    activeMiddleButton: {
      borderLeft: `1px solid ${dividerColor}`,
      borderRight: `1px solid ${dividerColor}`,
    },
  };
});

export default class ToggleButtonGroup extends Component {

  static propTypes = {
    /**
     * Should be used to pass `ToggleButton` components.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      className,
      ...otherGroupProps,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    const buttons = React.Children.map(children, (button, index) => {
      const {
        children: buttonChildren,
        className: buttonClassProp,
        disabled,
        active,
        onClick,
        ...other,
      } = button.props;

      const buttonClassName = classNames(buttonClassProp, {
        [classes.firstButton]: index === 0,
        [classes.lastButton]: index === (children.length - 1),
        [classes.activeMiddleButton]: active && index !== (children.length - 1) && index !== 0,
      });

      return (
        <ToggleButton
          active={active}
          disabled={disabled}
          onClick={onClick}
          className={classNames(buttonClassName)}
          {...other}
        >
          {buttonChildren}
        </ToggleButton>
      );
    }, this);
    return (
      <Paper
        className={classNames(className, classes.root)}
        zDepth={4}
        {...otherGroupProps}
      >
        {buttons}
      </Paper>
    );
  }
}
