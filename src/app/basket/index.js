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
import useProduct from "../../store/hooks/use-product";

function Basket() {
  const [words,language] = useLanguage()
  const {closeModal} = useModal('basket')
  const [basket, callBasket] = useBasket()
  const [product, callProduct] = useProduct()

  const select = useSelector(state => ({
    list: state.basket.list,
    sum: state.basket.sum
  }));


  const callbacks = {
    // Удаление из корзины
    removeFromBasket: callBasket.removeFromBasket,
    // Закрытие модального окна
    closeModal: closeModal,
    // Установка продукта без подгрузки с сервера
    setItem: callProduct.setItem
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket
        item={item}
        onRemove={callbacks.removeFromBasket}
        onClose={callbacks.closeModal}
        onSetItem={callbacks.setItem}
        words={words}
        language={language}
        toItem={`/main/${item._id}`}
      />
    }, [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={capitalizeFirstLetter(words.basket.title)} onClose={callbacks.closeModal} words={words}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} words={words}/>
    </ModalLayout>
  );
}

export default memo(Basket);

