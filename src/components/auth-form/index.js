import {memo} from "react";
import PropTypes from 'prop-types';
import Input from "../input";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function AuthForm(props){
  const cn = bem('LoginForm');

  return (
    <form className={cn()}>
      <span>{props.loginLabel}</span>
      <Input delay={10} value={props.loginValue} onChange={props.onLoginChange} tabIndex={1}/>
      <span>{props.passwordLabel}</span>
      <Input delay={10} value={props.passwordValue} onChange={props.onPasswordChange} type={'password'} tabIndex={2}/>
    </form>
  )
}

AuthForm.propTypes = {
  loginValue:PropTypes.string,
  passwordValue:PropTypes.string,
  onLoginChange:PropTypes.func,
  onPasswordChange:PropTypes.func,
  loginLabel:PropTypes.string,
  passwordLabel:PropTypes.string
};

AuthForm.defaultProps = {
  loginValue:'',
  passwordValue:'',
  onLoginChange:() => {},
  onPasswordChange:() => {},
  loginLabel:'Логин',
  passwordLabel:'Пароль'
}

export default memo(AuthForm);
