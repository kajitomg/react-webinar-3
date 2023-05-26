import StoreModule from "../module";
import Catalog from "../catalog";
import {codeGenerator} from "../../utils";

class Pagination extends StoreModule {

  initState() {
    return {
      page:1, // Номер текущей страницы
      pages:[], // Массив индексов страниц
      maxPage: 1, // Количество страниц элементов
      limit:10 // Лимит вывода элементов на страницу
    }
  }

  /**
   * Установка страницы
   * @param page номер страницы которую нужно установить
   */
  async setPage(page){
    const generator = codeGenerator();
    const maxPage = this.getState().maxPage;
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
      page:page,
      pages:pagesArray
    })
  }

  async setMaxPage(){
    const response = await fetch(`/api/v1/articles?limit=1&fields=items(_id),count`)
    const json = await response.json()
    const maxPage = Math.ceil(json.result.count / this.getState().limit)
    return this.setState({
      ...this.getState(),
      maxPage:maxPage
    });
  }


}
export default Pagination;