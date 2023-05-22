import {generateCode, getProductsPrice} from "./utils";
import {cartInfo} from "./data";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление элемента в корзину
   * @param product{Object} // Товар, добавляемый в корзину
   */
  addItem(product) {
    let include = false;  // Boolean флаг для определения добавляется уникальный товар, или уже выбранный
    let products = Object.assign(this.state.cart.products);

    products.map((item) => {
      if(product.code === item.code){
        item.quantity++;
        include = true;
      }
      return item;
    });
    if(!include){
      product.quantity = 1;
      products = [...products, product];
    }

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        products:products,
        info:{
          total:getProductsPrice(products),
          quantity:products.length
        }
      },
    });
  };

  /**
   * Удаление элемента из корзины
   * @param product{Object} // Элемент, удаляемый из корзины
   */
  deleteItem(product) {
    const products = Object.assign(this.state.cart.products).filter(item => item.code !== product.code);
    this.setState({
      ...this.state,
      // Новый массив элементов в корзине, в котором не будет удаляемого элемента
      cart: {
        ...this.state.cart,
        products:products,
        info:{
          total:getProductsPrice(products),
          quantity:products.length
        }
      }
    });
  };
};

export default Store;
