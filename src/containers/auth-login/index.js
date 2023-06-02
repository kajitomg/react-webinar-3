import {memo, useCallback, useState} from 'react';
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate} from "react-router-dom";
import AuthForm from "../../components/auth-form";
import AuthError from "../../components/auth-error";

function AuthLogin() {
  const store = useStore();
  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    error:state.user.error,
    user:state.user.info
  }));
  const callbacks = {
    onLogin:useCallback(() => {
      if(login.length === 0 || password.length === 0) return
      store.actions.user.login(login,password)
        .then((res) => {
          setLogin('')
          setPassword('')
          if (!res) {
            return navigate('/');
          }
        })
    },[login,password])
  }

  return (
    <Spinner active={select.waiting}>
      <SideLayout padding='medium'>
      <div>
        <h2>Вход</h2>
        <AuthForm loginValue={login} onLoginChange={setLogin} passwordValue={password} onPasswordChange={setPassword}/>
        {select.error && <AuthError error={select.error.message}/>}
        <button  onClick={callbacks.onLogin} tabIndex={3}>Войти</button>
      </div>
      </SideLayout>
    </Spinner>
  );
}

export default memo(AuthLogin);