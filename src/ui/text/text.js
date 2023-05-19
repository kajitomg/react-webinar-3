import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';

export const cnText = bem('Text')

function Text(props){
  return (
    <span className={cnText({},[props.className])}>{props.title}</span>
  )
}

Text.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  weight: PropTypes.string,
  size: PropTypes.string
};
Text.defaultProps = {
  weight: 's',
  size: 'regular'
};

export { Text };
