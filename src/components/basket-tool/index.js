import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {capitalizeFirstLetter, numberFormat, plural} from "../../utils";
import {languageTypes} from "../../store/language";
import useLanguage from "../../store/hooks/use-language";
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const [words,language] = useLanguage()

  return (
    <div className={cn()}>
      <span className={cn('label')}>{capitalizeFirstLetter(words.page.inBasket)}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, words.page.product,language === languageTypes.english && 'en-US')} / ${numberFormat(sum)} ₽`
          : words.page.empty
        }
      </span>
      <button onClick={onOpen}>{capitalizeFirstLetter(words.buttons.goto)}</button>
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
