import {memo, useCallback, useEffect} from "react";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import Page from "../../containers/page";
import {useLocation} from "react-router-dom";
import ProductInfo from "../../components/product-info";
import useBasket from "../../store/hooks/use-basket";
import useProduct from "../../store/hooks/use-product";
import useLanguage from "../../store/hooks/use-language";
import useModal from "../../store/hooks/use-modal";

function Product() {
  const location = useLocation()
  const [basket, callBasket] = useBasket()
  const [product, callProduct] = useProduct()
  const [words,language,setLanguage] = useLanguage()
  const {openModal} = useModal('basket')

  const select = useSelector(state => ({
    item:state.product.data,
    amount:state.basket.amount,
    sum:state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: callBasket.addToBasket,
    // Загрузка продукта по идентификатору
    loadItem: callProduct.loadItem,
    // Очистка стейта от продукта
    clearItem: callProduct.clearItem,
    // Установка языка интерфейса
    setLanguage: setLanguage,
    // Открытие модального окна
    openModal: openModal
  }
  useEffect(() => {
    callbacks.loadItem(location.pathname.split('/')[location.pathname.split('/').length - 1])
    return () => callbacks.clearItem()
  },[location.pathname])

  return (
    <Page
      title={select.item?.title}
      words={words}
      setLanguage={callbacks.setLanguage}
      sum={select.sum}
      language={language}
      amount={select.amount}
      openModal={callbacks.openModal}
    >
      <ProductInfo item={select.item} onAdd={callbacks.addToBasket} words={words}/>
    </Page>
  );
}

export default memo(Product);