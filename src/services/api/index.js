class APIService {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param lang {String} Локаль
   */
  constructor(services, config = {}, lang) {
    this.services = services;
    this.config = config
    this.listeners = []
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept-Language':lang
    }
  }
  /**
   * Добавление слушателя
   * @param listener {Function} Функция
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Оповещение слушателей
   */
  callListeners() {
    this.listeners.forEach(func => func());
  }

  /**
   * HTTP запрос
   * @param url
   * @param method
   * @param headers
   * @param options
   * @returns {Promise<{}>}
   */
  async request({url, method = 'GET', headers = {}, ...options}) {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: {...this.defaultHeaders, ...headers},
      ...options,
    });
    return {data: await res.json(), status: res.status, headers: res.headers};
  }

  /**
   * Установка или сброс заголовка
   * @param name {String} Название заголовка
   * @param value {String|null} Значение заголовка
   */
  setHeader(name, value = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
