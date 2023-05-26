import {memo, useCallback, useEffect} from 'react';
import List from "../../components/list";
import useSelector from "../../store/hooks/use-selector";
import Pagination from "../../components/pagination";
import Page from "../../components/page";
import {capitalizeFirstLetter} from "../../utils";
import useLanguage from "../../store/hooks/use-language";
import usePagination from "../../store/hooks/use-pagination";
import Item from "../../components/item";
import useStore from "../../store/hooks/use-store";

function Main() {
  const store = useStore()
  const [pagination,callPagination] = usePagination()
  const [words] = useLanguage()

  const select = useSelector(state => ({
    list: state.catalog.list
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  useEffect(() => {
    (async () => {
      await callPagination.setMaxPage()
      if(select.list.length === 0){
        await callPagination.loadPage(1)
      }
    })()
  }, []);

  return (
    <Page title={capitalizeFirstLetter(words.page.mainTitle)}>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination page={pagination.page} maxPage={pagination.maxPage} pages={pagination.pages} onClick={callPagination.loadPage}/>
    </Page>
  );
}

export default memo(Main);
