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

function Main() {
  const [pagination,callPagination] = usePagination()
  const [words] = useLanguage()
  const [basket, callBasket] = useBasket()

  const select = useSelector(state => ({
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

  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
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
    <Page title={capitalizeFirstLetter(words.page.mainTitle)}>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination page={select.page} maxPage={select.maxPage} pages={select.pages} onClick={callbacks.loadPage}/>
    </Page>
  );
}

export default memo(Main);
