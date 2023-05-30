import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat, plural} from "../../utils";
import {languageTypes} from "../../store/language";
import './style.css';

function BasketTool(props) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{capitalizeFirstLetter(props.words.page.inBasket)}:</span>
      <span className={cn('total')}>
        {props.amount
          ? `${props.amount} ${plural(props.amount, props.words.page.product,props.language === languageTypes.english && 'en-US')} / ${numberFormat(props.sum)} ₽`
          : props.words.page.empty
        }
      </span>
      <button onClick={props.onOpen}>{capitalizeFirstLetter(props.words.buttons.goto)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  words:PropTypes.object.isRequired
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
