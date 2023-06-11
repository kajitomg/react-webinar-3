import {memo} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import './style.css';

function CommentsAuth(props){
  const cn = bem('CommentsAuth');
  const location = useLocation()

  const callbacks = {
    onClose: () => {
      props.onClose()
    }
  }

  return (
    <div className={cn({nested:props.nested,paddingOff:props.paddingOff})}>
      <span className={cn('text')}><Link to={'/login'} state={{back:location.pathname}}>Войдите</Link>, {props.text}</span>
      {props.button && <button className={cn('button')} role={'button'} onClick={callbacks.onClose}>{props.button}</button>}
    </div>
  );
}

CommentsAuth.propTypes = {
  text:PropTypes.string,
  button:PropTypes.string,
  onClose:PropTypes.func,
  nested:PropTypes.bool,
  paddingOff:PropTypes.bool
};

CommentsAuth.defaultProps = {
  text:'чтобы иметь возможность комментировать',
  button:null,
  setCommented:() => {},
  nested:false
}

export default memo(CommentsAuth);
