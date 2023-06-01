import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category:''
      },
      categories:[{value:'',title:'Все',parent:null}],
      count: 0,
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) validParams.category = urlParams.get('category');
    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };
    if(params.category){
      apiParams['search[category]'] = params.category
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }

  /**
   * Запрос категорий с сервера
   * @return {Promise<void>}
   */
  async initCategories(){
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Загружается список категорий из АПИ');

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const result = []

    const sortFilter = (array) => {
      let entryPoints = null
      const sortedArray = []
      array.forEach((item,i) => {
        if(!sortedArray.includes(item)){
          sortedArray.push(item)
        }
        if(!entryPoints){
          entryPoints = []
          array.forEach(inner => {
            if(inner?.parent?._id === item.value){
              entryPoints.push(inner)
            }
          })
          if(entryPoints.length === 0) entryPoints = null
        }
        if(item.value === entryPoints?.[0]?.parent?._id){
          sortedArray.splice(sortedArray.indexOf(item) + 1,0,...entryPoints)
          entryPoints = null
        }
      })
      return sortedArray
    }
    result.push({value:'',title:'Все',parent:null})
    json.result.items.forEach((item) => {
      result.push({value:item._id,title:item.title,parent:item.parent})
    })

    this.setState({
      ...this.getState(),
      categories: sortFilter(result),
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }
}

export default CatalogState;
