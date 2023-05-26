import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import {Link} from "react-router-dom";
import useStore from "../../store/use-store";
import './style.css';
import useSelector from "../../store/use-selector";

function Item(props){

  const cn = bem('Item');
  const store = useStore();

  const select = useSelector(state => ({
    language:state.language.words.words
  }));

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
        <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(select.language.buttons.add)}</button>
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
