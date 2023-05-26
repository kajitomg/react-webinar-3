import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'


function ItemPagination (props){
  const cn = bem('ItemPagination')
  const callbacks = {
    onClick: () => {
      props.onClick(props.title)
    }
  }
  return (
    <div className={cn({active:props.active})} onClick={callbacks.onClick}>
      <span className={cn('title',{active:props.active})}>
        {props.title}
      </span>
    </div>
  );
}

ItemPagination.propTypes = {
  title:PropTypes.number.isRequired,
  onClick:PropTypes.func,
  active:PropTypes.bool
};
ItemPagination.defaultProps = {
  onClick:() => {},
  active:false
};

export default memo(ItemPagination);