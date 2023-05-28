import useStore from "./use-store";
import useSelector from "./use-selector";
import {useCallback} from "react";

export default function useBasket(){
  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    sum: state.basket.sum,
    amount: state.basket.amount
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  }

  return [select,callbacks]
}