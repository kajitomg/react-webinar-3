import React from "react";
import PropTypes from "prop-types";
import {rubCurrency} from "../../utils";
import './style.css';

function ItemCart(props){

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
      <span className='Item-title'>{props.item.title}</span>
      <span className='Item-price'>{rubCurrency(props.item.price)}</span>
      <span className='Item-quantity'>{`${props.item.quantity} шт`}</span>
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number
  }).isRequired,
  onClick:PropTypes.func
};

ItemCart.defaultProps = {
  onClick:() => {}
}

export default React.memo(ItemCart);
