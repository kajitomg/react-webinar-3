import {memo, useCallback} from "react"
import SideLayout from "../../components/side-layout";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import HeaderAccount from "../../components/header-account";
import useTranslate from "../../hooks/use-translate";

function Header(){
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    waiting: state.user.waiting,
    user:state.profile.info,
    isLogin:state.user.isLogin
  }));

  const callbacks = {
    onLogout:useCallback(() => {
      store.actions.user.logout()
        .then((res) => {
          if(!res){
            return store.actions.profile.setProfile({},null)
          }
          return store.actions.profile.setProfile(store.actions.profile.getState(),res)
        })
    },[]),
    onLogin:useCallback(() => {
      navigate('/login')
    },[])
  }

  const {t} = useTranslate();
  
  return (
    <Spinner active={select.waiting}>
      <SideLayout side={'end'} padding='small'>
       <HeaderAccount isLogin={select.isLogin} onLogin={callbacks.onLogin} onLogout={callbacks.onLogout}
                      id={select.user._id} name={select.user?.profile?.name} loginLabel={select.isLogin ?t('login.logout'):t('login.signin')}/>
      </SideLayout>
    </Spinner>
  )
}

export default memo(Header);