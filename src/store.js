import { createCounter } from "./utils";

/**
 * Хранилище состояния приложения
 */
const indexGenerator = createCounter(8) // Функция генерации уникального индекса для элемента списка

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
	 * Добавление новой записи
	 */
	addItem() {
		this.setState({
			...this.state,
			list: [...this.state.list, { code: indexGenerator(), title: 'Новая запись' }]
		})
	};

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter(item => item.code !== code)
		})
	};

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code !== code) { // Проверка для исключения случая клика по уже выбранному элементу
					item.selected = false
				}
				if (item.code === code) {
					if (!item.selected) {
						if (!item.selections) {
							item.selections = 0 // Инициируем поле, так как в исходном массиве его нет
						}
						item.selections++
					}
					item.selected = !item.selected;
				}
				return item;
			})
		})
	}
}

export default Store;
