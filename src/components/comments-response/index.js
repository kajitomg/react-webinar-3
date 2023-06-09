import {memo, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';
import {useDispatch} from "react-redux";
import commentActions from "../../store-redux/comment/actions";

function CommentsResponse(props){
  const cn = bem('CommentsResponse');
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const callbacks = {
    onChange: (e) => {
      setText(e.target.value)
    },
    onAdd: () => {
      dispatch(commentActions.add(text,props.user,props.parent))
      props.setCommented()
      setText('')
    },
    onClose: () => {
      props.setCommented()
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
  user:PropTypes.object,
  title:PropTypes.string,
  button:PropTypes.string,
  parent:PropTypes.object,
  nested:PropTypes.bool,
  setCommented:PropTypes.func
};

CommentsResponse.defaultProps = {
  title:'Новый комментарий',
  button:null,
  article:'',
  parent:null
}

export default memo(CommentsResponse);
