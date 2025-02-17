import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useTranslate from "../../hooks/use-translate";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
  };

  const {t} = useTranslate();

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: t('filter.order')},
      {value: 'title.ru', title: t('filter.naming')},
      {value: '-price', title: t('filter.dear')},
      {value: 'edition', title: t('filter.old')},
    ]), [t]),
    categories: useMemo(() => ([
      {value: '', title: t('filter.all')},
      ...treeToList(listToTree(select.categories), (item, level) => (
        {value: item._id, title: '- '.repeat(level) + item.title}
      ))
    ]), [select.categories,t]),
  };

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t('filter.search')}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
