import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsAmount({amount,t}){
  const cn = bem('CommentsAmount');

  return (
    <div className={cn()}>
      <span>{t('comment.comments')}({amount})</span>
    </div>
  )
}

CommentsAmount.propTypes = {
  amount:PropTypes.number,
  t:PropTypes.func
};

CommentsAmount.defaultProps = {
  amount:0,
  t: (text) => text
}

export default memo(CommentsAmount);
