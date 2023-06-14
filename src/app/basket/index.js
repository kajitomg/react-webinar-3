import {memo, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import modalsActions from '../../services/store-redux/modals/actions';

function Basket() {

  const store = useStore();
  const dispatch = useDispatch();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      //store.actions.modals.close();
      dispatch(modalsActions.close());
    }, [store]),
  }

  const {t} = useTranslate();

  const renders = {
    itemBasket: useCallback((item) => (
      <ItemBasket item={item}
                  link={`/articles/${item._id}`}
                  onRemove={callbacks.removeFromBasket}
                  onLink={callbacks.closeModal}
                  t={t}
      />
    ), [callbacks.removeFromBasket]),
  };

  return (
    <ModalLayout title={t('basket.title')} onClose={callbacks.closeModal} t={t}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} t={t}/>
    </ModalLayout>
  );
}

export default memo(Basket);
