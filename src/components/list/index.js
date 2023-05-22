import React from "react";
import PropTypes from 'prop-types';
import ItemProduct from "../item-product";
import ItemCart from "../item-cart";
import './style.css';

export const listTypes = {
  product:'product',
  cart:'cart'
}

function List(props){
  return (
    <div className='List'>
      {props.items.map( item =>
        <div className='List-item' key={item.code}>
          {props.type === listTypes.product && <ItemProduct item={item} onClick={props.onClick}/> ||
          props.type === listTypes.cart && <ItemCart item={item} onClick={props.onClick}/>}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  items:PropTypes.array.isRequired,
  type:PropTypes.string.isRequired,
  onClick:PropTypes.func
};
List.defaultProps = {
  onClick:() => {}
}

export default React.memo(List);
