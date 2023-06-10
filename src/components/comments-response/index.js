import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function CommentsResponse(props){
  const cn = bem('CommentsResponse');

  const [text, setText] = useState('')

  const callbacks = {
    onChange: (e) => {
      setText(e.target.value)
    },
    onAdd: () => {
      props.onAdd(text,props.parent)
      setText('')
    },
    onClose: () => {
      props.onClose()
    }
  }

  return (
    <div className={cn({nested:props.nested})}>
      <h4 className={cn('title')}>{props.title}</h4>
      <textarea className={cn('textarea')} value={text} onChange={callbacks.onChange}></textarea>
      <div className={cn('buttons')}>
        <button className={cn('button')} role={'button'} onClick={callbacks.onAdd}>Отправить</button>
        {props.button && <button className={cn('button')} role={'button'} onClick={callbacks.onClose}>{props.button}</button>}
      </div>
    </div>
  );
}

CommentsResponse.propTypes = {
  title:PropTypes.string,
  button:PropTypes.string,
  onClose:PropTypes.func,
  onAdd:PropTypes.func,
  parent:PropTypes.object,
  nested:PropTypes.bool
};

CommentsResponse.defaultProps = {
  title:'Новый комментарий',
  button:null,
  parent:null,
  onClose:() => {},
  onAdd:() => {},
  nested:false
}

export default memo(CommentsResponse);
