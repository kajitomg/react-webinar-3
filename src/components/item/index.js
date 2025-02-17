import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import numberFormat from "../../utils/number-format";
import {Link} from "react-router-dom";
import './style.css';

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={props.link}>{props.item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} {props.labelCurr}</div>
        <button onClick={callbacks.onAdd}>{props.t('article.add')}</button>
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
  link: PropTypes.string,
  onAdd: PropTypes.func,
  labelCurr: PropTypes.string,
  t:PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {},
  labelCurr: '₽',
  t:(text) => text
}

export default memo(Item);
