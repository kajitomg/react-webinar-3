import StoreModule from "../module";

class Modals extends StoreModule {

  initState() {
    return {
      name: null
    }
  }
  /**
   * Открытие модального окна
   * @param name{String} название открываемого модального окна
   */
  openModal(name){
    this.setState({name}, `Открытие модалки ${name}`);
  }

  /**
   * Закрытие модального окна
   */
  closeModal(){
    this.setState({name: null}, `Закрытие модалки`);
  }
}

export default Modals;
