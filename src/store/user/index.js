import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class UserState extends StoreModule {

  initState() {
    return {
      info:{},
      isLogin: false,
      waiting: false,
      error:null
    }
  }

  async initLogin(){
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
        this.setState({
          ...this.getState(),
          info:data,
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
    return await this.getState().error
  }

  async login(login,password){
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
        this.setState({
          ...this.getState(),
          info:data.user,
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
    return await this.getState().error
  }
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
          info:{},
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
}

export default UserState;
