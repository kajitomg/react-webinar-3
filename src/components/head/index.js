import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {Text} from "../../ui/text";

function Head(props){
  return (
    <div className='Head'>
      <Text weight='bold' size='l' title={props.title} className='Head-title'/>
      {props.children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
