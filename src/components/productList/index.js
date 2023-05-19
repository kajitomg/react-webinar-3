import React, {useContext} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {rubCurrency} from "../../utils";
import {StoreContext} from "../../context";
import {Text} from "../../ui/text";

function ProductList(props){
  const {products} = useContext(StoreContext);

  const callbacks = {
    onAddItem: (product) => {
      props.onAdd(product)
    }
  }

  return (
    <div className='List'>{
      products.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={callbacks.onAddItem} buttonText={'Добавить'}>
            <Text weight='regular' size='m' title={rubCurrency(item.price)} className='Item-price'/>
          </Item>
        </div>
      )}
    </div>
  )
}

ProductList.propTypes = {
  onAdd:PropTypes.func
};

export default React.memo(ProductList);
