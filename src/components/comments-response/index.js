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
      dispatch(commentActions.add(text,null,props.article,props.parent))
      dispatch(commentActions.setCommented());
    }
  }

  return (
    <div className={cn({nested:props.nested})}>
      <h4 className={cn('title')}>{props.title}</h4>
      <textarea className={cn('textarea')} value={text} onChange={callbacks.onChange}></textarea>
      <div className={cn('buttons')}>
        <button className={cn('button')} role={'button'} onClick={callbacks.onAdd}>Отправить</button>
        {props.button && <button className={cn('button')} role={'button'}>{props.button}</button>}
      </div>
    </div>
  );
}

CommentsResponse.propTypes = {
  title:PropTypes.string,
  button:PropTypes.string,
  article:PropTypes.string,
  parent:PropTypes.object,
  nested:PropTypes.bool
};

CommentsResponse.defaultProps = {
  title:'Новый комментарий',
  button:null,
  article:'',
  parent:null
}

export default memo(CommentsResponse);
