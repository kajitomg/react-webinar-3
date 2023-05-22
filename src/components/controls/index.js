import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {getProductsPrice, plural, rubCurrency} from "../../utils";
import {StoreContext} from "../../context";
import './style.css';

function Controls(props){
  const {cart} = useContext(StoreContext);

  const productPlural = (number) => {
    return plural(number, {one: 'товар', few: 'товара', many: 'товаров'})
  }

  const callbacks = {
    onOpenModal: () => {
      props.onOpen();
    }
  }

  return (
    <div className='Controls'>
      <div>
        <span title={'В корзине:'}>В корзине:</span>
        <span className='Controls-price'>
          {
            cart.info.quantity > 0
              ?
              `${cart.info.quantity} ${productPlural(cart.info.quantity)} / ${rubCurrency(getProductsPrice(cart.products))}`
              :
              'пусто'
          }
        </span>
      </div>
      <button onClick={callbacks.onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen:PropTypes.func
};
Controls.defaultProps = {
  onOpen:() => {}
}

export default React.memo(Controls);
