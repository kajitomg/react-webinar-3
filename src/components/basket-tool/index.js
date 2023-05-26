import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat, plural} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";
import {languageTypes} from "../../store/language";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const select = useSelector(state => ({
    languageWords:state.language.words.words,
    language:state.language.language
  }));

  return (
    <div className={cn()}>
      <span className={cn('label')}>{capitalizeFirstLetter(select.languageWords.page.inBasket)}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, select.languageWords.page.product,select.language === languageTypes.english && 'en-US')} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>{capitalizeFirstLetter(select.languageWords.buttons.goto)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
