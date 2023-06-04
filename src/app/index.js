import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import Login from "./login";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import SafeRoute from "../containers/safe-route";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore()

  const select = useSelector(state => ({
    isLogin: state.user.isLogin,
    waiting: state.profile.waiting
  }));

  const activeModal = useSelector(state => state.modals.name);

  useInit(() => {
    store.actions.user.initLogin()
      .then((res) =>{
        store.actions.profile.setProfile(res.info,res.error)
      });
  }, [], true);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={
          <SafeRoute redirect={'/login'} condition={!select.waiting && !select.isLogin} isWaiting={select.waiting} element={<Profile/>}/>}
        />
        <Route path={'/login'} element={
          <SafeRoute redirect={'/'} condition={!select.waiting && select.isLogin} isWaiting={select.waiting} element={<Login/>}/>}
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
