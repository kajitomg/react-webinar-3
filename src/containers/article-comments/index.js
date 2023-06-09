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
import comments from "../../utils/comments";
import {useDispatch} from "react-redux";
import commentActions from "../../store-redux/comment/actions";

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
    },[])
  }

  const renders = {
    item: useCallback(item => (
      <ArticleComment text={item?.text} date={dateFormat(item?.dateCreate).split('г.').join('')}
                      author={searchUser(select.users,item?.author?._id).profile.name} exists={select.exists}
                      tree={item.children} users={select.users} commented={select.commented}
                      setCommented={callbacks.setCommented} id={item._id} user={select.user} item={item}/>
    ), [select.users,select.exists,select.commented]),
  };
  console.log(select.comments)
  return (
    <>
      <CommentsAmount amount={select.comments.length}/>
      <Comments comments={comments(select.comments)} renderItem={renders.item}/>
      {select.commented === select.article._id ?
        select.exists ?
          <CommentsResponse title={'Новый комментарий'} article={select.article._id} setCommented={callbacks.setCommented} user={select.user}/> :
          <CommentsAuth text={'чтобы иметь возможность комментировать'} setCommented={callbacks.setCommented}/>
        :
        ''
      }
    </>
  )
}

export default memo(ArticleComments);
