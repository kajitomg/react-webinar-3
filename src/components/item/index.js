import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import {Link} from "react-router-dom";
import './style.css';

function Item(props){
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id),
    // Действие при нажатии на товар
    onGoItem: () => props.onSetItem(props.item)
  }
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.toItem}  onClick={callbacks.onGoItem}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{capitalizeFirstLetter(props.words.buttons.add)}</button>
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
  onSetItem: PropTypes.func,
  words:PropTypes.object,
  toItem:PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
