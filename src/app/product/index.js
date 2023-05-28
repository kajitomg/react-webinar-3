import {memo, useCallback, useEffect} from "react";
import useStore from "../../store/hooks/use-store";
import useSelector from "../../store/hooks/use-selector";
import Page from "../../containers/page";
import {useLocation} from "react-router-dom";
import ProductInfo from "../../components/product-info";
import useBasket from "../../store/hooks/use-basket";
import useProduct from "../../store/hooks/use-product";

function Product() {
  const location = useLocation()
  const [basket, callBasket] = useBasket()
  const [product, callProduct] = useProduct()

  const select = useSelector(state => ({
    item:state.product.data
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: callBasket.addToBasket,
    // Загрузка продукта по идентификатору
    loadItem: callProduct.loadItem,
    // Очистка стейта от продукта
    clearItem: callProduct.clearItem,
  }
  useEffect(() => {
    callbacks.loadItem(location.pathname.split('/')[location.pathname.split('/').length - 1])
    return () => callbacks.clearItem()
  },[location.pathname])

  return (
    <Page title={select.item?.title}>
      <ProductInfo item={select.item} onAdd={callbacks.addToBasket}/>
    </Page>
  );
}

export default memo(Product);