import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsAmount({amount}){
  const cn = bem('CommentsAmount');

  return (
    <div className={cn()}>
      <span>Комментарии({amount})</span>
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
