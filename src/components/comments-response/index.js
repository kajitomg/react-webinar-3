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
    onAdd: (e) => {
      e.preventDefault()
      if(text.length === 0 || !text.replace(/\s/g, '').length) return setText('')
      props.onAdd(text,props.parent)
      setText('')
    },
    onClose: () => {
      props.onClose()
    }
  }

  return (
    <div className={cn({nested:props.nested,paddingOff:props.paddingOff})}>
      <form className={cn('form')}>
        <h4 className={cn('title')}>{props.title}</h4>
        <textarea className={cn('textarea')} value={text} onChange={callbacks.onChange}></textarea>
        <div className={cn('buttons')}>
          <button className={cn('button')} role={'button'} onClick={callbacks.onAdd} type={'submit'}>{props.submit}</button>
          {props.button && <button className={cn('button')} role={'button'} onClick={callbacks.onClose}>{props.button}</button>}
        </div>
      </form>
    </div>
  );
}

CommentsResponse.propTypes = {
  title:PropTypes.string,
  button:PropTypes.string,
  onClose:PropTypes.func,
  onAdd:PropTypes.func,
  parent:PropTypes.object,
  nested:PropTypes.bool,
  submit:PropTypes.string,
  paddingOff:PropTypes.string
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
