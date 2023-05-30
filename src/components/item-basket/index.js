import {memo} from 'react';
import propTypes from 'prop-types';
import {capitalizeFirstLetter, numberFormat, plural} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {languageTypes} from "../../store/language";
import './style.css';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    //Загрузка уже имеющейся информации для отображения
    onGoItem: () => {
      if(location.pathname.split('/')[location.pathname.split('/').length - 1] !== props.item._id){
        props.setItem(props.item)
      }
      props.onClose()
    }
  };

  return (
    <div className={cn()}>
      <span className={cn('title')}>
        <Link to={props.toItem} onClick={callbacks.onGoItem}>{props.item.title}</Link>
      </span>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}
          {
            props.language === languageTypes.russian && ` ${props.words.basket.unit}` ||
            props.language === languageTypes.english && ` ${plural(props.item.amount,props.words.basket.unit,'en-US')}`
          }
        </div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{capitalizeFirstLetter(props.words.buttons.delete)}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
  onSetItem: propTypes.func,
  words:PropTypes.object.isRequired,
  language:PropTypes.string,
  toItem:PropTypes.string.isRequired
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  onSetItem: () => {},
  language:languageTypes.russian
}

export default memo(ItemBasket);
