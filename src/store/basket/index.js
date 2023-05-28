import StoreModule from "../module";

class Basket extends StoreModule {

  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = {...item, amount: item.amount + 1};
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      let item = this.store.getState().catalog.list.find(item => item._id === _id)
      if(!item){
        // Если в корзине товар не найден, тогда обращаемся к серверу для получения товара
        const response = await fetch(`/api/v1/articles/${_id}`); // Возможно запрашивая только цену товара, скорость запроса будет выше
        const json = await response.json()
        item = json.result
      }
      await list.push({...item, amount: 1}); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += await item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
