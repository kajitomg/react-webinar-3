import {memo} from 'react';
import {cn as bem} from '@bem-react/classname'
import PropTypes from "prop-types";
import './style.css';

function ProfileInfo(props) {
  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <span className={cn('item')}>Имя: <span>{props.name}</span></span>
      <span className={cn('item')}>Телефон: <span>{props.phonenumber}</span></span>
      <span className={cn('item')}>email: <span>{props.email}</span></span>
    </div>
  )
}

ProfileInfo.propTypes = {
  name:PropTypes.string,
  phonenumber:PropTypes.string,
  email:PropTypes.string
}
ProfileInfo.defaultProps = {
  name:undefined,
  phonenumber:undefined,
  email:undefined
}

export default memo(ProfileInfo);
