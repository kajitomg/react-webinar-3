import {generateCode, getProductsPrice} from "./utils";


/**
 * Список продуктов
 * @type {Object[]} //Массив продуктов
 * @property {Number} code // Код элемента
 * @property {String} title // Название элемента
 * @property {Number} price // Цена элемента
 */
export const products = [
  {code: generateCode(), title: 'Название товара', price: 100.0},
  {code: generateCode(), title: 'Книга про React', price: 770},
  {code: generateCode(), title: 'Конфета', price: 33},
  {code: generateCode(), title: 'Трактор', price: 7955320},
  {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
  {code: generateCode(), title: 'Карандаши цветные', price: 111},
  {code: generateCode(), title: 'Товар сюрприз', price: 0}
];

/**
 * Продукты в корзине
 * @type {Object[]} //Массив продуктов
 * @property {Number} code // Код элемента
 * @property {String} title // Название элемента
 * @property {Number} price // Цена элемента
 * @property {Number} quantity // Количество данного товара в корзине
 */
export const cartProducts =  [
  {code: 1, title: 'Название товара', price: 100.0,quantity:1},
  {code: 2, title: 'Книга про React', price: 770,quantity:2}
];

/**
 * Информация о корзине
 * @type {Object} // Объект с информацией относящейся к корзине
 * @property {Number} total // Общая стоимость товара
 * @property {String} quantity // Количество уникального товара
 */
export const cartInfo = {
  total:getProductsPrice(cartProducts),
  quantity:cartProducts.length,
}