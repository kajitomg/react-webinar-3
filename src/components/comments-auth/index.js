import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";

function CommentsAuth(props){
  const cn = bem('CommentsAuth');

  return (
    <div className={cn({nested:props.nested})}>
      <span className={cn('text')}><Link to={'/login'}>Войдите</Link>, {props.text}</span>
      {props.button && <button className={cn('button')} role={'button'}>{props.button}</button>}
    </div>
  );
}

CommentsAuth.propTypes = {
  text:PropTypes.string,
  button:PropTypes.string,
  nested:PropTypes.bool
};

CommentsAuth.defaultProps = {
}

export default memo(CommentsAuth);
