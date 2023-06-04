import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list:[{value:'',title:'Все',parent:null}],
      waiting: false
    }
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
      list: sortFilter(result),
      waiting: false
    }, 'Загружен список категорий из АПИ');
  }
}

export default CategoryState;
