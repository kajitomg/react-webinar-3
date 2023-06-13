// Начальное состояние
const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  error:null
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article/load-start":
      return { ...state, data: {}, waiting: true, error:null};

    case "article/load-success":
      return { ...state, data: action.payload.data, waiting: false};

    case "article/load-error":
      return { ...state, data: {}, waiting: false, error: action.payload.error};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
