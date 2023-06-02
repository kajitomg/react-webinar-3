import {memo } from "react"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css'

function HeaderAccount(props){

  const cn = bem('HeaderAccount');

  return (
        <div className={cn()}>
          {
            props.isLogin && <Link to={`/profile`} className={cn('name')}>{props.name}</Link>
          }
          <button onClick={props.isLogin ?props.onLogout:props.onLogin} className={cn('button')}>{props.isLogin ?'Выход':'Вход'}</button>
        </div>
  )
}

HeaderAccount.propTypes = {
  isLogin: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func
};

HeaderAccount.defaultProps = {
  onLogout: () => {},
  onLogin: () => {},
  id: '',
  name: '',
}

export default memo(HeaderAccount);