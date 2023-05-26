import {memo} from 'react';
import propTypes from 'prop-types';
import {capitalizeFirstLetter, numberFormat, plural} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import useStore from "../../store/use-store";
import './style.css';
import useSelector from "../../store/use-selector";
import {languageTypes} from "../../store/language";

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const store = useStore();

  const select = useSelector(state => ({
    languageWords:state.language.words.words,
    language:state.language.language,
  }));

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    //Загрузка уже имеющейся информации для отображения
    onGoItem: () => {
      if(location.pathname.split('/')[location.pathname.split('/').length - 1] !== props.item._id){
        store.actions.product.setItem(props.item);
      }
      store.actions.modals.closeModal()
    }
  };

  return (
    <div className={cn()}>
      <span className={cn('title')}>
        <Link to={`/main/${props.item._id}`} onClick={callbacks.onGoItem}>{props.item.title}</Link>
      </span>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)}
          {
            select.language === languageTypes.russian && ` ${select.languageWords.basket.unit}` ||
            select.language === languageTypes.english && ` ${plural(props.item.amount,select.languageWords.basket.unit,'en-US')}`
          }
        </div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{capitalizeFirstLetter(select.languageWords.buttons.delete)}</button></div>
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
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
