/**
 * Форматирование дат
 * @param value {Number}
 * @param locale {String}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(value, locale = 'ru-RU', options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
}) {
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
