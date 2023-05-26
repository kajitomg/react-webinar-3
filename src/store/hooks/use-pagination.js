import useStore from "./use-store";
import useSelector from "./use-selector";
import {useCallback} from "react";

export default function usePagination(){
  const store = useStore();

  const select = useSelector(state => ({
    page:state.pagination.page,
    pages:state.pagination.pages,
    limit:state.pagination.limit,
    maxPage:state.pagination.maxPage
  }));

  const callbacks = {
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
  return [select,callbacks]
}