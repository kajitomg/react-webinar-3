import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CommentsAmount({amount,comments}){
  const cn = bem('CommentsAmount');

  return (
    <div className={cn()}>
      <span>{comments}({amount})</span>
    </div>
  )
}

CommentsAmount.propTypes = {
  amount:PropTypes.number,
  comments:PropTypes.string
};

CommentsAmount.defaultProps = {
  amount:0
}

export default memo(CommentsAmount);
