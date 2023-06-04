import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class UserState extends StoreModule {

  initState() {
    return {
      isLogin: false,
      waiting: true,
      error:null
    }
  }

  /**
   * Автоматическая авторизации при заходе на сайт при наличии токена
   * @return {Promise<void>}
   */
  async initLogin(){
    let info = {}
    this.setState({
      ...this.getState(),
      waiting: true
    })
    const token = document.cookie.split('=')[1]
    await new Promise((resolve, reject) => {
      fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => data.result ? resolve(data.result) : reject(data))
    })
      .then(data => {
        // Обработка успешного запроса на сервер
        info = data
        this.setState({
          ...this.getState(),
          isLogin: true,
          error:null,
          waiting: false
        })
      })
      .catch(rej => {
        // Обработка запроса на сервер с ошибкой
        this.setState({
          ...this.getState(),
          waiting: false
        })
      })
    return await {info,error:this.getState().error}
  }

  /**
   * Авторизация
   * @return {Promise<void>}
   */
  async login(login,password){
    let info = {}
    this.setState({
      ...this.getState(),
      waiting: true,
      error:null,
    })
    await new Promise((resolve, reject) => {
      fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({login,password,remember:true}),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => data.result ? resolve(data.result) : reject(data))
    })
      .then(data => {
        // Обработка успешного запроса на сервер
        info = data.user
        this.setState({
          ...this.getState(),
          isLogin: true,
          error:null,
          waiting: false
        })
      })
      .catch(rej => {
        // Обработка запроса на сервер с ошибкой
        this.setState({
          ...this.getState(),
          error:rej.error,
          waiting: false
        })
      })
    return await {info, error:this.getState().error}
  }

  /**
   * Деавторизация
   * @return {Promise<void>}
   */
  async logout(){
    const token = document.cookie.split('=')[1]
    this.setState({
      ...this.getState(),
      waiting: true,
      error:null,
    })
    await new Promise((resolve, reject) => {
      fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          "X-Token": token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => data.result ? resolve(data.result) : reject(data))
    })
      .then(data => {
        // Обработка успешного запроса на сервер
        this.setState({
          ...this.getState(),
          isLogin: false,
          error:null,
          waiting: false
        })
      })
      .catch(rej => {
        // Обработка запроса на сервер с ошибкой
        this.setState({
          ...this.getState(),
          error:rej.error,
          waiting: false
        })
      })
    return await this.getState().error
  }

  /**
   * Очистка ошибки
   * @return {Object}
   */
  clearError(){
    this.setState({
      ...this.getState(),
      error:null,
    })

    return this.getState().error
  }

  /**
   * Установка ошибки
   * @param error {string} Тело ошибки - текст ошибки
   * @return {Object | null}
   */
  setError(error){
    this.setState({
      ...this.getState(),
      error: {message:error},
    })

    return this.getState().error
  }
}

export default UserState;
