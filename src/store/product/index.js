import StoreModule from "../module";


class Product extends StoreModule {


  initState() {
    return this.setState({
      data:{}
    });
  }

  /**
   * Загрузка товара по идентификатору
   * @param _id{Number} Идентификатор товара
   */
  async loadItem(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`)
    const json = await response.json()
    return this.setItem(json.result)
  }

  /**
   * Очистка стейта
   */
  clearItem() {
    return this.setState({
      ...this.getState(),
      data: {}
    });
  }

  /**
   * Установка товара в стейт
   * @param item{Object} Устанавливаемый товар
   */
  setItem(item){
    return this.setState({
      ...this.getState(),
      data:item
    });
  }
}

export default Product