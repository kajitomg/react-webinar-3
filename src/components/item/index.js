import React, {useState} from "react";
import PropTypes, {string} from "prop-types";
import './style.css';
import {Text} from "../../ui/text";

function Item(props){

  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item);
    }
  }

  return (
    <div
      className={'Item'}
      onClick={callbacks.onClick}
    >
      <div className='Item-code'>{props.item.code}</div>
      <Text weight='regular' size='s' title={props.item.title} className='Item-title'/>
      <div className='Item-children'>
        {props.children}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick:PropTypes.func,
  buttonText:string
};

Item.defaultProps = {
}

export default React.memo(Item);
