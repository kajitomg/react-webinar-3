import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Page from "../../components/page";
import {capitalizeFirstLetter} from "../../utils";
import {languageTypes} from "../../store/language";

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    page:state.pagination.page,
    pages:state.pagination.pages,
    limit:state.pagination.limit,
    maxPage:state.pagination.maxPage,
    language:state.language.words.words
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Подгрузка нужной страницы
    loadPage: useCallback((page) => {
          store.actions.catalog.loadItems(page,select.limit);
          return store.actions.pagination.setPage(page)
      }, [store]),
    // Подгрузка числа страниц
    setMaxPage: useCallback(() => {
      return store.actions.pagination.setMaxPage();
    }, [store]),
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
    <Page title={capitalizeFirstLetter(select.language.page.mainTitle)}>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination page={select.page} maxPage={select.maxPage} pages={select.pages} onClick={callbacks.loadPage}/>
    </Page>
  );
}

export default memo(Main);
