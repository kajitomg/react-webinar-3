export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name) => {
    return {type: 'modal/open', payload: {name}};
  },

  /**
   * Закрытие модалки
   */
  close: () => {
    return {type: 'modal/close'}
  }
}
