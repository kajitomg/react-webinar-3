import {Routes, Route} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Profile from "./profile";
import Auth from "./login";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore()

  const activeModal = useSelector(state => state.modals.name);

  const select = useSelector(state => ({
    isLogin: state.user.isLogin
  }));

  useInit(() => {
    store.actions.user.initLogin();
  }, [], true);


  return (
    <>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/login'} element={<Auth/>}/>
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
