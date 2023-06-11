import {memo, useCallback, useState} from "react";
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import shallowequal from "shallowequal";
import Comments from "../../components/comments";
import ArticleComment from "../../components/article-comment";
import dateFormat from "../../utils/date-format";
import searchUser from "../../utils/search-user";
import CommentsAmount from "../../components/comments-amount";
import CommentsResponse from "../../components/comments-response";
import CommentsAuth from "../../components/comments-auth";
import useSelector from "../../hooks/use-selector";
import {useDispatch} from "react-redux";
import commentActions from "../../store-redux/comment/actions";
import commentsToTree from "../../utils/comments-to-tree";

function ArticleComments() {

  const dispatch = useDispatch()

  const selectRedux = useSelectorRedux(state => ({
    comments: state.comment.comments,
    users: state.comment.users,
    commented: state.comment.commented,
    article: state.article.data
  }), shallowequal);

  const selectStore = useSelector(state => ({
    exists: state.session.exists,
    categories: state.categories.list,
    user: state.session.user,
  }));

  const select = {...selectRedux,...selectStore}

  const callbacks = {
    setCommented: useCallback((id = null) => {
      dispatch(commentActions.setCommented(id))
    },[]),

    onAdd: useCallback((text,parent) => {
      dispatch(commentActions.add(text,select.user,parent))
      callbacks.setCommented()
    },[select.user]),

    onClose: () => {
      callbacks.setCommented()
    }
  }

  const renders = {
    item: useCallback(item => (
      <ArticleComment text={item?.text} date={dateFormat(item?.dateCreate).split('г.').join('')} author={searchUser(select.users,item?.author?._id)?.profile?.name}
                      setCommented={callbacks.setCommented} id={item._id} onAdd={callbacks.onAdd} nested={item.parent._id !== select.article._id} isUser={item?.author?._id === select.user._id}>
        {item.children.length > 0 && <Comments comments={item.children} renderItem={renders.item} nested={true}/>}
        {select.commented === item._id ?
          select.exists
            ?
            <CommentsResponse title={'Новый ответ'} button={'Отмена'} nested={true} onClose={callbacks.onClose} onAdd={callbacks.onAdd} parent={item}/> :
            <CommentsAuth text={'чтобы иметь возможность ответить.'} button={'Отмена'} nested={true} onClose={callbacks.onClose}/>
          :
          ''
        }
      </ArticleComment>
    ), [select.users, select.exists, select.commented, select.users]),
  };

  return (
    <>
      <CommentsAmount amount={select.comments.length}/>
      <Comments comments={commentsToTree(select.comments)} renderItem={renders.item}/>
      {select.commented === select.article._id ?
        select.exists ?
          <CommentsResponse title={'Новый комментарий'} article={select.article._id} setCommented={callbacks.setCommented} onAdd={callbacks.onAdd}/> :
          <CommentsAuth text={'чтобы иметь возможность комментировать'} setCommented={callbacks.setCommented}/>
        :
        ''
      }
    </>
  )
}

export default memo(ArticleComments);
