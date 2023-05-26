import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  initState() {
    return {
      list: []
    }
  }
  /**
   * Загрузка товаров по страницам
   * @param page{Number} страница
   * @param limit{Number} ограничение по выводу количества товара на странице
   */
  async loadItems(page = 1,limit = 10) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${limit*(page-1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    return this.setState({
       ...this.getState(),
       list: json.result.items
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
