import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function AuthError(props){
  const cn = bem('AuthError');

  return (
    <span className={cn()}>{props.error}</span>
  )
}

AuthError.propTypes = {
  error:PropTypes.string,
};

AuthError.defaultProps = {
  error:'',
}

export default memo(AuthError);
