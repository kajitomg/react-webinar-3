// Начальное состояние
const initialState = {
  comments: [],
  commented: '',
  waiting: false, // признак ожидания загрузки
  users: [],
  error:null
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comment/load-start":
      return { ...state, comments: [], waiting: true,error:null};

    case "comment/load-success":
      return { ...state, comments: action.payload.comments, users: action.payload.users, waiting: false};

    case "comment/load-error":
      return { ...state, comments: [], waiting: false,error: action.payload.error};

    case "comment/add-success":
      return { ...state, comments: [...state.comments, action.payload.comment], users:[...state.users, ...action.payload.user], waiting: false};

    case "comment/add-error":
      return { ...state, comments: [...state.comments], waiting: false,error: action.payload.error};

    case "comment/set-success":
      return { ...state, commented: action.payload.commented, waiting: false};

    case "comment/set-error":
      return { ...state, comments: state.commented, waiting: false, error: action.payload.error};


    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
