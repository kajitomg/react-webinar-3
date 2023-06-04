import {memo} from 'react';
import {cn as bem} from '@bem-react/classname'
import PropTypes from "prop-types";
import './style.css';
import Spinner from "../spinner";

function ProfileInfo(props) {
  const cn = bem('ProfileInfo');

  return (
    <Spinner active={props.waiting}>
      <div className={cn()}>
        <h2 className={cn('title')}>{props.labelTitle}</h2>
        <span className={cn('item')}>Имя: <span>{props.name}</span></span>
        <span className={cn('item')}>Телефон: <span>{props.phonenumber}</span></span>
        <span className={cn('item')}>email: <span>{props.email}</span></span>
      </div>
    </Spinner>
  )
}

ProfileInfo.propTypes = {
  waiting:PropTypes.bool,
  name:PropTypes.string,
  phonenumber:PropTypes.string,
  email:PropTypes.string,
  labelTitle:PropTypes.string
}
ProfileInfo.defaultProps = {
  waiting:true,
  name:'Имя',
  phonenumber:'Телефон',
  email:'email',
  labelTitle:'Профиль'
}

export default memo(ProfileInfo);
