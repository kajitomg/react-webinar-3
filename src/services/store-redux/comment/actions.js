export default {
  /**
   * Загрузка комментариев
   * @param id // Идентификатор поста
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({type: 'comment/load-start'});

      try {
        const userIDs = []
        const comments = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${id}&limit=*`
        });

        comments.data.result.items.forEach(item => !userIDs.includes(item.author._id) && userIDs.push(item.author._id))

        const users = await services.api.request({
          url: `/api/v1/users/?search[query]=${comments.data.result.items.length > 0 ? userIDs.join('|') : '*'}`
        });

        // Комментарии загружены успешно
        dispatch({type: 'comment/load-success', payload: {comments: comments.data.result.items,users:users.data.result.items}});
        dispatch({type: 'comment/set-success', payload: {commented: getState().article.data._id}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error',payload:{error: {text:e}}});
      }
    }
  },
  /**
   * Добавление комментария
   * @param text Комментарий
   * @param user Данные комментатора
   * @param parent Идентификатор родителя поста
   * @return {Function}
   */
  add: (text ,user ,parent = null) => {
    return async (dispatch, getState, services) => {
      try {
        if(!parent) parent = getState().article.data

        const data = {
          text,
          parent,
        }

        const res = await services.api.request({
          url: `/api/v1/comments`,
          method:'POST',
          body: JSON.stringify(data)
        });

        getState().comment.users.forEach(item => {
          if(item._id === user._id) return user = []
        })

        // Комментарий успешно добавлен
        dispatch({type: 'comment/add-success', payload: {comment:res.data.result,user:user}});
      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/add-error',payload:{error: {text:e}}});
      }
    }
  },

  /**
   * Выбор комментируемого комментария
   * @param id Идентификатор поста
   * @return {Function}
   */
  setCommented: (id = null) => {
    return async (dispatch, getState, services) => {
      try {
        dispatch({type: 'comment/set-success', payload: {commented: id || getState().article.data._id}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/set-error',payload:{error: {text:e}}});
      }
    }
  },
}
