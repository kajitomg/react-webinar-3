import {memo, useCallback, useEffect} from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Page from "../../components/page";
import {useLocation} from "react-router-dom";
import ProductInfo from "../../components/product-info";

function Product() {

  const location = useLocation()

  const store = useStore();

  const select = useSelector(state => ({
    item:state.product.data
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  }

  useEffect(() => {
    store.actions.product.loadItem(location.pathname.split('/')[location.pathname.split('/').length - 1])
    return () => store.actions.product.clearItem()
  },[location.pathname])

  return (
    <Page title={select.item?.title}>
      <ProductInfo item={select.item} onAdd={callbacks.addToBasket}/>
    </Page>
  );
}

export default memo(Product);