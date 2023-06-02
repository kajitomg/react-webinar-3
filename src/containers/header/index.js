import {memo, useCallback} from "react"
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import {Link, useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import HeaderAccount from "../../components/header-account";

function Header(){
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    user:state.user.info,
    isLogin:state.user.isLogin
  }));
  const callbacks = {
    onLogout:useCallback(() => {
      store.actions.user.logout()
    },[]),
    onLogin:useCallback(() => {
      navigate('/login')
    },[])
  }
  return (
    <Spinner active={select.waiting}>
      <SideLayout side={'end'} padding='small'>
       <HeaderAccount isLogin={select.isLogin} onLogin={callbacks.onLogin} onLogout={callbacks.onLogout}
                      id={select.user._id} name={select.user?.profile?.name}/>
      </SideLayout>
    </Spinner>
  )
}

export default memo(Header);