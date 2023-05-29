import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat} from "../../utils";
import './style.css';

function BasketTotal(props) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{capitalizeFirstLetter(props.words.basket.total)}</span>
      <span className={cn('cell')}> {numberFormat(props.sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  words:PropTypes.object
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
