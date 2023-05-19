import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import {StoreContext} from "./context";
import ProductList from "./components/productList";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {

	const [isModalOpened, setIsModalOpened] = useState(false);
	const products = store.getState().products;
	const cart = store.getState().cart;

	const callbacks = {
		onDeleteItem: useCallback((product) => {
			store.deleteItem(product);
		}, [store]),

		onAddItem: useCallback((product) => {
			store.addItem(product);
		}, [store])
	}

	return (
		<StoreContext.Provider value={{products,cart}}>
			<PageLayout>
				<Head title='Магазин' />
				<Controls onOpen={() => setIsModalOpened(true)}/>
				<ProductList
					onAdd={callbacks.onAddItem}
				/>
				<Modal
					isOpened={isModalOpened}
					onClose={() => setIsModalOpened(!isModalOpened)}
					onDelete={callbacks.onDeleteItem}
				/>
			</PageLayout>
		</StoreContext.Provider>
	);
}

export default App;
