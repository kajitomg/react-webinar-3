const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
	const element = document.createElement(name);

	// Назначение свойств и атрибутов
	for (const name of Object.keys(props)) {
		if (propNames.has(name)) {
			element[name] = props[name];
		} else {
			element.setAttribute(name, props[name]);
		}
	}

	// Вставка вложенных элементов
	for (const child of children) {
		element.append(child);
	}

	return element;
}

/**
 * Создание счетчика
 * @param firstIndex {Number} Число с которого начинается счетчик
 * @returns {Function}
 */
export function createCounter(firstIndex) {

	let index = firstIndex; // Замыкаем начальноого значения счетчика при вызове функции counter

	return function () {

		return index++
	}
}

/**
 * Создание форматора
 * @param one {String} Пример склонения слова с 'один'
 * @param two {String} Пример склонения слова с 'два'
 * @param few {String} Пример склонения слова с 'несколько'
 * @returns {Function}
 */
export function createStringFormatter(one, two, few) {
	const cases = [2, 0, 1, 1, 1, 2];
	const closedTitles = [one, two, few];

	return (number) => {
		return closedTitles[
			number % 100 > 4 && number % 100 < 20
				? 2
				: cases[number % 10 < 5 ? number % 10 : 5]
		];
	};
}

