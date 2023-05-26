import React,{memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname'
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import "./style.css"
import useSelector from "../../store/use-selector";

function ProductInfo(props){

  const cn = bem('ProductInfo')

  const select = useSelector(state => ({
    language:state.language.words.words
  }));

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>{props.item?.description}</div>
      <div className={cn('country')}>{capitalizeFirstLetter(select.language.product.country)}: <span>{props.item?.madeIn?.title}({props.item?.madeIn?.code})</span></div>
      <div className={cn('category')}>{capitalizeFirstLetter(select.language.product.category)}: <span>{props.item?.title}</span></div>
      <div className={cn('release')}>{capitalizeFirstLetter(select.language.product.edition)}: <span>{props.item?.edition}</span></div>
      <div className={cn('price')}>{capitalizeFirstLetter(select.language.product.price)}: {numberFormat(props.item?.price)} {props.item?.price ? '₽':''}</div>
      <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(select.language.buttons.add)}</button>
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