// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly/lib/styleSheet';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('ToggleButton', (theme) => {
  const { palette } = theme;
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: '0 0 auto',
      fontSize: 24,
      width: 48,
      height: 36,
      padding: 0,
      backgroundColor: palette.grey[50],
      color: palette.grey[400],
    },
    active: {
      color: palette.grey[800],
      backgroundColor: palette.grey[400],
    },
    disabled: {
      backgroundColor: palette.grey[50],
      color: palette.grey[400],
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
  };
});

/**
 * @see https://material.google.com/components/buttons.html
 *
 * ```js
 * import ToggleButton from 'material-ui/ToggleButton';
 *
 * const Component = () => <ToggleButton>delete</ToggleButton>;
 * ```
 */
export default class ToggleButton extends Component {
  static propTypes = {
    /**
     * The icon element. If a string is passed,
     * it will be used as a material icon font ligature
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If true, the button will be toggled on.
     */
    active: PropTypes.bool,
    /**
     *
     */
    onClick: PropTypes.func,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      active,
      disabled,
      onClick,
      children,
      className: classNameProp,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const className = classNames(classes.root, {
      [classes.disabled]: disabled,
      [classes.active]: active,
    }, classNameProp);
    return (
      <ButtonBase
        className={classNames(classes.root, className)}
        ripple={false}
        disabled={disabled}
        keyboardFocusedClassName={classes.keyboardFocused}
        onClick={onClick}
        {...other}
      >
        <span className={classes.label}>
          {typeof children === 'string' ? <span className="material-icons">{children}</span> : children}
        </span>
      </ButtonBase>
    );
  }
}
