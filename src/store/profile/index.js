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
   * @param data {Object} Данные профиля
   * @param error {Object | null} Ошибка при наличии
   * @return {Object}
   */
  async setProfile(data,error){
    this.setState({
      ...this.getState(),
      info:data,
      error,
      waiting: false
    })
    return await this.getState().error
  }

}

export default ProfileState;
