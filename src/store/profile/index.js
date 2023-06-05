import StoreModule from "../module";

/**
 * Покупательская корзина
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      info:{},
      waiting:true,
      error:null
    }
  }
  /**
   * Установка данных аккаунта
   * @return {Object}
   */
  async initProfile(){
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
    return await {info:this.getState().info,error:this.getState().error}
  }

  /**
   * Установка данных аккаунта
   * @param data {Object} Данные профиля
   * @param error {Object | null} Ошибка при наличии
   * @return {Object}
   */
  async setProfile(data,error){
    this.setState({
      ...this.getState(),
      info: data,
      error,
      waiting: false
    })
    return await {info:this.getState().info,error:this.getState().error}
  }

}

export default ProfileState;
