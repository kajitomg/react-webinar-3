import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import "./style.css"

function ProductInfo(props){
  const cn = bem('ProductInfo')

  const callbacks = {
    //Добавление продукта в корзину
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item?.description}</div>
      <div className={cn('country')}>{capitalizeFirstLetter(props.words.product.country)}: <span>{props.item?.madeIn?.title}({props.item?.madeIn?.code})</span></div>
      <div className={cn('category')}>{capitalizeFirstLetter(props.words.product.category)}: <span>{props.item?.title}</span></div>
      <div className={cn('release')}>{capitalizeFirstLetter(props.words.product.edition)}: <span>{props.item?.edition}</span></div>
      <div className={cn('price')}>{capitalizeFirstLetter(props.words.product.price)}: {numberFormat(props.item?.price)} {props.item?.price ? '₽':''}</div>
      <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(props.words.buttons.add)}</button>
    </div>
  );
}


ProductInfo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description:PropTypes.string,
    madeIn:PropTypes.shape({
      title:PropTypes.string,
      code:PropTypes.string
    }),
    edition:PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
    words:PropTypes.object
  }).isRequired,
  onAdd:PropTypes.func
};

ProductInfo.defaultProps = {
  onAdd: () => {}
};

export default  memo(ProductInfo);