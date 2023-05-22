import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Popup from "../popup";
import {rubCurrency} from "../../utils";
import {StoreContext} from "../../context";
import List, {listTypes} from "../list";
import './style.css';

function Modal(props){
  const {cart} = useContext(StoreContext);

  const callbacks = {
    onCloseModal: () => {
      props.onClose()
    },
    onDeleteItem: (product) => {
      props.onDelete(product)
    }
  }

  return (
    <Popup title={'Корзина'} isOpened={props.isOpened} onClose={callbacks.onCloseModal}>
      <List items={cart.products} type={listTypes.cart} onClick={callbacks.onDeleteItem}/>
      <div className='Popup-total'>
        <span>Итого</span>
        <span>{rubCurrency(cart.info.total)}</span>
      </div>
    </Popup>
  )
}

Modal.propTypes = {
  isOpened:PropTypes.bool,
  onClose:PropTypes.func,
  onDelete:PropTypes.func
};

Modal.defaultProps = {
  isOpened:false,
  onClose:() => {},
  onDelete:() => {}
}

export default React.memo(Modal);
