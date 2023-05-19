import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {rubCurrency} from "../../utils";
import {StoreContext} from "../../context";
import {Text} from "../../ui/text";

function CartList(props){
  const {cart} = useContext(StoreContext);

  const callbacks = {
    onDeleteItem: (product) => {
      props.onDelete(product);
    }
  }

  return (
    <div className='List'>{
      cart.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={callbacks.onDeleteItem} buttonText={'Удалить'}>
            <>
              <Text weight='regular' size='m' title={rubCurrency(item.price)} className='Item-price'/>
              <Text weight='regular' size='m' title={`${item.quantity} шт`} className='Item-quantity'/>
            </>
          </Item>
        </div>
      )}
    </div>
  )
}

CartList.propTypes = {
  onDelete: PropTypes.func,
};

export default React.memo(CartList);
