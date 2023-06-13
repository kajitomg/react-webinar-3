import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import useTranslate from "../../hooks/use-translate";
import './style.css';

function CommentsAmount({amount}){
  const cn = bem('CommentsAmount');

  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <span>{t('comment.comments')}({amount})</span>
    </div>
  )
}

CommentsAmount.propTypes = {
  amount:PropTypes.number
};

CommentsAmount.defaultProps = {
  amount:0
}

export default memo(CommentsAmount);
