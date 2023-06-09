import {memo, useCallback} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";
import Comments from "../comments";
import dateFormat from "../../utils/date-format";
import searchUser from "../../utils/search-user";
import CommentsResponse from "../comments-response";
import CommentsAuth from "../comments-auth";

function ArticleComment(props){
  const cn = bem('ArticleComment');

  const callbacks = {
    setCommented: useCallback(() => {
      props.setCommented(props.id)
    },[])
  }

  const renders = {
    item: useCallback((item) => (
      <ArticleComment text={item?.text} date={dateFormat(item?.dateCreate).split('г.').join('')}
                      author={searchUser(props.users,item?.author?._id).profile.name} exists={props.exists}
                      tree={item.children} users={props.users} nested={true} commented={props.commented} setCommented={props.setCommented}
                      id={item._id} user={props.user} item={item}/>
    ), [props.tree,props.users,props.exists,props.commented]),
  };
  return (
    <div className={cn({nested:props.nested})}>
      <div className={cn('info')}>
        <span className={cn('author')}>{props.author}</span>
        <span className={cn('date')}>{props.date}</span>
      </div>
      <div className={cn('text')}>{props.text}</div>
      <div className={cn('buttons')}>
        <span className={cn('button')} role={'button'} onClick={callbacks.setCommented}>Ответить</span>
      </div>
      {props.children}
      {props.tree &&
        <>
          {props.commented === props.id ?
            props.exists ?
              <CommentsResponse title={'Новый ответ'} button={'Отмена'} nested={true} setCommented={props.setCommented} user={props.user} parent={props.item} /> :
              <CommentsAuth text={'чтобы иметь возможность ответить.'} button={'Отмена'} nested={true} setCommented={props.setCommented}/>
            :
            ''
          }
          <Comments comments={props.tree} renderItem={renders.item} nested={true}/>
        </>
      }
    </div>
  );
}

ArticleComment.propTypes = {
  item:PropTypes.object,
  id:PropTypes.string,
  author:PropTypes.string,
  date:PropTypes.string,
  text:PropTypes.string,
  tree:PropTypes.array,
  exists:PropTypes.bool,
  users:PropTypes.array,
  user:PropTypes.object,
  nested:PropTypes.bool,
  commented:PropTypes.string,
  setCommented:PropTypes.func

};

ArticleComment.defaultProps = {
}

export default memo(ArticleComment);
