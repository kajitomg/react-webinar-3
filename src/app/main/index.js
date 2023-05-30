import {memo, useCallback, useEffect} from 'react';
import List from "../../components/list";
import useSelector from "../../store/hooks/use-selector";
import Pagination from "../../components/pagination";
import Page from "../../containers/page";
import {capitalizeFirstLetter} from "../../utils";
import useLanguage from "../../store/hooks/use-language";
import usePagination from "../../store/hooks/use-pagination";
import Item from "../../components/item";
import useBasket from "../../store/hooks/use-basket";
import useProduct from "../../store/hooks/use-product";
import useModal from "../../store/hooks/use-modal";

function Main() {
  const [pagination,callPagination] = usePagination()
  const [words,language,setLanguage] = useLanguage()
  const [basket, callBasket] = useBasket()
  const [product, callProduct] = useProduct()
  const {openModal} = useModal('basket')

  const select = useSelector(state => ({
    amount:state.basket.amount,
    sum:state.basket.sum,
    list: state.catalog.list,
    page:state.catalog.pagination.page,
    pages:state.catalog.pagination.pages,
    maxPage:state.catalog.pagination.maxPage
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: callBasket.addToBasket,
    // Подгрузка нужной страницы
    loadPage: callPagination.loadPage,
    // Подгрузка нужной страницы
    setMaxPage: callPagination.setMaxPage,
    // Установка продукта без подгрузки с сервера
    setItem: callProduct.setItem,
    // Установка языка интерфейса
    setLanguage: setLanguage,
    // Открытие модального окна
    openModal: openModal

  }

  const renders = {
    item: useCallback((item,words) => {
      return <Item
        item={item}
        onAdd={callbacks.addToBasket}
        onSetItem={callbacks.setItem}
        words={words}
        toItem={`/main/${item._id}`}
      />
    }, [callbacks.addToBasket]),
  };

  useEffect(() => {
    (async () => {
      await callbacks.setMaxPage()
      if(select.list.length === 0){
        await callbacks.loadPage(1)
      }
    })()
  }, []);

  return (
    <Page
      title={capitalizeFirstLetter(words.page.mainTitle)}
      words={words}
      setLanguage={callbacks.setLanguage}
      sum={select.sum}
      language={language}
      amount={select.amount}
      openModal={callbacks.openModal}
    >
      <List list={select.list} renderItem={renders.item} words={words}/>
      <Pagination page={select.page} maxPage={select.maxPage} pages={select.pages} onClick={callbacks.loadPage}/>
    </Page>
  );
}

export default memo(Main);
