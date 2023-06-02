import {memo, useCallback, useState} from 'react';
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate} from "react-router-dom";

function AuthLogin() {
  const cn = bem('Auth');
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
    onLogin:useCallback(async () => {
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
      <div className={cn()}>
        <h2 className={cn('title')}>Вход</h2>
        <form className={cn('form')}>
          <span>Логин</span>
          <Input delay={10} value={login} onChange={setLogin} tabIndex={1}/>
          <span>Пароль</span>
          <Input delay={10} value={password} onChange={setPassword} tabIndex={2}/>
        </form>
        {select.error && <span className={cn('error')}>{select.error.message}</span>}
        <button className={cn('button')} onClick={callbacks.onLogin} tabIndex={3}>Войти</button>
      </div>
      </SideLayout>
    </Spinner>
  );
}

export default memo(AuthLogin);