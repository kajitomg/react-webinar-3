import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <span className='Head-title'>{props.title}</span>
      {props.children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default React.memo(Head);
