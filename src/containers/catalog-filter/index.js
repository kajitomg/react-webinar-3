import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import Spinner from "../../components/spinner";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.catalog.categories,
    waiting: state.catalog.waiting,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Поиск
    onFilter: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => select.categories, [select.categories])
  };

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <SideLayout padding='medium'>
        <Select options={options.category} value={select.category} onChange={callbacks.onFilter}/>
        <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
        <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
               delay={600}/>
        <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
      </SideLayout>
    </Spinner>
  )
}

export default memo(CatalogFilter);
