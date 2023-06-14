import * as translations from "./translations";

class I18n {

  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   * @param language {String} Локаль
   */
  constructor(services, config = {},language) {
    this.services = services;
    this.config = config;
    this.listeners = [];
    this.language = language;
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
   * Удаление слушателя
   * @param func {Function} Функция
   */
  /**
   * Перевод фразу по словарю
   * @param lang {String} Локаль
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang = this.language, text, plural) {

    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined'){
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  /**
   * Смена локали
   * @param lang {String} Код языка
   * @returns {String} Код локали
   */
  setLanguage(lang) {
    this.language = lang

    this.callListeners()
    this.services.api.callListeners()

    return this.language;
  }
}

export default I18n;
