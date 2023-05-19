import React, {useContext} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Popup from "../popup";
import {getProductsPrice, rubCurrency} from "../../utils";
import CartList from "../cartList";
import {StoreContext} from "../../context";
import {Text} from "../../ui/text";

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
      <CartList onDelete={callbacks.onDeleteItem}/>
      <div className='Popup-total'>
        <Text weight='bold' size='m' title='Итого'/>
        <Text weight='bold' size='m' title={rubCurrency(getProductsPrice(cart))}/>
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
