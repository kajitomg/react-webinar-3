import useStore from "./use-store";
import useSelector from "./use-selector";
import {useCallback} from "react";

export default function useProduct(){
  const store = useStore();

  const select = useSelector(state => ({
    item:state.product.data
  }));

  const callbacks = {
    // Загрузка продукта по идентификатору
    loadItem: useCallback((_id) => store.actions.product.loadItem(_id), [store]),
    // Очистка стейта от продукта
    clearItem: useCallback(() => store.actions.product.clearItem(), [store]),
    // Установка продукта без подгрузки с сервера
    setItem: (item) => store.actions.product.setItem(item)
  }

  return [select,callbacks]
}