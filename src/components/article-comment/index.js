import {memo, useCallback, useRef} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function ArticleComment(props){
  const cn = bem('ArticleComment');
  const ref = useRef(null)

  const callbacks = {
    setCommented: useCallback(() => {
      props.setCommented(props.id)
      ref.current.scrollIntoView({block:'center'})
    },[]),

    onAdd:useCallback((text,parent) => {
      props.onAdd(text,parent)
    },[])
  }

  return (
    <div className={cn({nested:props.nested})}>
      <div className={cn('info')}>
        <span className={cn('author',{user:props.isUser})}>{props.author}</span>
        <span className={cn('date')}>{props.date}</span>
      </div>
      <div className={cn('text')}>{props.text}</div>
      <div className={cn('buttons')}>
        <span className={cn('button')} role={'button'} onClick={callbacks.setCommented}>{props.answer}</span>
      </div>
      {props.children}
      <div ref={ref}></div>
    </div>
  );
}

ArticleComment.propTypes = {
  author:PropTypes.string,
  isUser:PropTypes.bool,
  date:PropTypes.string,
  text:PropTypes.string,
  nested:PropTypes.bool,
  onAdd:PropTypes.func,
  setCommented:PropTypes.func,
  answer:PropTypes.string,
};

ArticleComment.defaultProps = {
}

export default memo(ArticleComment);
