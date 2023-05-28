import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useSelector from "../../store/hooks/use-selector";
import {capitalizeFirstLetter} from "../../utils";
import useLanguage from "../../store/hooks/use-language";
import useModal from "../../store/hooks/use-modal";
import useBasket from "../../store/hooks/use-basket";

function Basket() {
  const [words] = useLanguage()
  const {closeModal} = useModal('basket')
  const [basket, callBasket] = useBasket()

  const select = useSelector(state => ({
    list: state.basket.list,
    sum: state.basket.sum
  }));


  const callbacks = {
    // Удаление из корзины
    removeFromBasket: callBasket.removeFromBasket,
    // Закрытие модального окна
    closeModal: closeModal,
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={capitalizeFirstLetter(words.basket.title)} onClose={callbacks.closeModal}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum}/>
    </ModalLayout>
  );
}

export default memo(Basket);

