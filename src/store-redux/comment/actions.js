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
  add: (text, user,parent = null) => {
    return async (dispatch, getState, services) => {
      try {
        const id = (new Date()).getTime().toString()
        const type = parent ?'comment':'article'
        if(!parent) parent = getState().article.data

        const comment = {
          author:{
            _id:user._id,
            _type:user._type
          },
          dateCreate:new Date().toISOString(),
          dateUpdate:new Date().toISOString(),
          parent:{
            _id:parent._id,
            _tree:
              getState().article.data._id !== parent._id ?[{
                _id:parent._id,
                _type:parent._type
              },
                {
                  _id:getState().article.data._id,
                  _type:getState().article.data._type
                }

            ]:[
                {
                  _id:parent._id,
                  _type:parent._type
                }
              ],
            _type:parent._type
          },
          text:text,
          _id:id,
          _type:type
        }
        getState().comment.users.forEach((item) => {
          if(item._id === user._id) return user = []
        })

        // Комментарий успешно добавлен
        dispatch({type: 'comment/add-success', payload: {comment,user:user}});
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
