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
        const res = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${id}`
        });
        let userIDs = ''
        res.data.result.items.forEach((item,i) => {
          userIDs += item.author._id
          if(res.data.result.items.length > i + 1){
            userIDs += '|'
          }
        })
        const users = await services.api.request({
          url: `/api/v1/users/?search[query]=${userIDs}`
        });
        dispatch({type: 'comment/set-success', payload: {commented: getState().article.data._id}});
        // Комментарии загружены успешно
        dispatch({type: 'comment/load-success', payload: {comments: res.data.result.items,users:users.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error'});
      }
    }
  },
  /**
   * Добавление комментария
   * @param text Комментарий
   * @param user Данные комментатора
   * @param id Идентификатор поста
   * @param parent Идентификатор поста
   * @return {Function}
   */
  add: (text, user, id,parent = null) => {
    return async (dispatch, getState, services) => {
      try {
        console.log(getState)
        // Комментарии загружены успешно
        //dispatch({type: 'comment/add-success', payload: {comments: res.data.result.items,users:users.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error'});
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

        dispatch({type: 'comment/set-success', payload: {commented: id | getState().article.data._id}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comment/load-error'});
      }
    }
  },
}
