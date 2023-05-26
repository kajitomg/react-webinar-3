import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import {Link} from "react-router-dom";
import useStore from "../../store/hooks/use-store";
import useLanguage from "../../store/hooks/use-language";
import './style.css';

function Item(props){
  const cn = bem('Item');

  const store = useStore();
  const [words] = useLanguage()

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
    //Загрузка уже имеющейся информации для отображения
    onGoItem: () => store.actions.product.setItem(props.item)
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/main/${props.item._id}`}  onClick={callbacks.onGoItem}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(words.buttons.add)}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
