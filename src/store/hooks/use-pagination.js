import useStore from "./use-store";
import useSelector from "./use-selector";
import {useCallback} from "react";

export default function usePagination(){
  const store = useStore();

  const select = useSelector(state => ({
    page:state.catalog.pagination.page,
    pages:state.catalog.pagination.pages,
    limit:state.catalog.pagination.limit,
    maxPage:state.catalog.pagination.maxPage
  }));

  const callbacks = {
    // Подгрузка нужной страницы
    loadPage: useCallback((page) => {
      store.actions.catalog.loadItems(page);
      return store.actions.catalog.setPage(page);
    }, [store]),
    // Установка максимальной страницы
    setMaxPage: useCallback(async () => {
     await store.actions.catalog.setMaxPage();
    }, [store]),
  }
  return [select,callbacks]
}