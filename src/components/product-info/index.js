import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import useLanguage from "../../store/hooks/use-language";
import "./style.css"

function ProductInfo(props){
  const cn = bem('ProductInfo')

  const [words] = useLanguage()

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item?.description}</div>
      <div className={cn('country')}>{capitalizeFirstLetter(words.product.country)}: <span>{props.item?.madeIn?.title}({props.item?.madeIn?.code})</span></div>
      <div className={cn('category')}>{capitalizeFirstLetter(words.product.category)}: <span>{props.item?.title}</span></div>
      <div className={cn('release')}>{capitalizeFirstLetter(words.product.edition)}: <span>{props.item?.edition}</span></div>
      <div className={cn('price')}>{capitalizeFirstLetter(words.product.price)}: {numberFormat(props.item?.price)} {props.item?.price ? '₽':''}</div>
      <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(words.buttons.add)}</button>
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
    amount: PropTypes.number
  }).isRequired,
  onAdd:PropTypes.func
};

export default  memo(ProductInfo);