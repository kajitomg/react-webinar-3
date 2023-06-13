import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from "../../utils/number-format";
import './style.css';
import useTranslate from "../../hooks/use-translate";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <span className={cn('label')}>{t('basket.inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${t('basket.articles', amount)} / ${numberFormat(sum)} ₽`
          : t('basket.empty')
        }
      </span>
      <button onClick={onOpen}>{t('basket.open')}</button>
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
  amount: 0,
  t: (text) => text
}

export default memo(BasketTool);
