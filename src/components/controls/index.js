import React, {useContext} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {getProductsPrice, plural, rubCurrency} from "../../utils";
import {StoreContext} from "../../context";
import {Text} from "../../ui/text";

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
        <Text weight='regular' size='s' title={'В корзине:'}/>
        <Text weight='bold' size='m' title={
          cart.length > 0
            ?
            `${cart.length} ${productPlural(cart.length)} / ${rubCurrency(getProductsPrice(cart))}`
            :
            'пусто'
        } className='Controls-price'/>
      </div>
      <button onClick={callbacks.onOpenModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen:PropTypes.func
};

export default React.memo(Controls);
