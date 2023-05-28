import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  initState() {
    return {
      list: [],
      pagination:{
        page:1, // Номер текущей страницы
        pages:[], // Массив индексов страниц
        maxPage: 1, // Количество страниц элементов
        limit:10 // Лимит вывода элементов на страницу
      }
    }
  }
  /**
   * Загрузка товаров по страницам
   * @param page{Number} страница
   */
  async loadItems(page = 1) {
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pagination.limit}&skip=${this.getState().pagination.limit*(page-1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    return this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  /**
   * Установка страницы
   * @param page номер страницы которую нужно установить
   */
  async setPage(page){
    const generator = codeGenerator();
    const maxPage = this.getState().pagination.maxPage;
    const pagesMap = new Map(
      [
        [generator(),page === 1 ? undefined : 1],
        [generator(),page - 2 > 1 ?null:undefined],
        [generator(),page === maxPage && maxPage > 3 ? page - 2 : undefined],
        [generator(),page - 1 <= 1 || page === 1 ? undefined : page - 1],
        [generator(),page],
        [generator(),page + 1 >= maxPage || page >= maxPage  ? undefined : page + 1],
        [generator(),page === 1 && maxPage > 3 ? page + 2 : undefined],
        [generator(),page + 2 < maxPage && maxPage > 4 ? null : undefined],
        [generator(),page === maxPage ? undefined : maxPage]
      ]
    );
    pagesMap.forEach((value,i) => {
      if(value === undefined){
        pagesMap.delete(i)
      }
    });

    const pagesArray = [...pagesMap].map(([name, value]) => ({ name, value }))
    return this.setState({
      ...this.getState(),
      pagination:{
        ...this.getState().pagination,
        page:page,
        pages:pagesArray
      }
    })
  }

  /**
   * Установка максимальной страницы данных // Отдельная функция нужна, чтобы было приятнее переключать страницы, так как loaditems занимает callstack и не дает отобразиться визуальной части пагинации
   */
  async setMaxPage(){
    const response = await fetch(`/api/v1/articles?limit=1&fields=items(_id),count`)
    const json = await response.json()
    const maxPage = Math.ceil(json.result.count / this.getState().pagination.limit)
    return this.setState({
      ...this.getState(),
      pagination:{
        ...this.getState().pagination,
        maxPage:maxPage
      }
    });
  }
}

export default Catalog;
