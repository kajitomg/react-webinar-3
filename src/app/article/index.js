import {memo, useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import articleActions from '../../services/store-redux/article/actions';
import commentActions from '../../services/store-redux/comment/actions';
import ArticleComments from "../../containers/article-comments";
import useServices from "../../hooks/use-services";

function Article() {
  const store = useStore();
  const dispatch = useDispatch();
  const api = useServices().api
  // Параметры из пути /articles/:id
  const params = useParams();

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentActions.load(params.id));
    return api.subscribe(() => {
      dispatch(articleActions.load(params.id));
      dispatch(commentActions.load(params.id));
    })
  }, [params.id],true);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <TopHead/>
      <Head title={select.article.title}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
      <Spinner active={select.waiting}>
        <ArticleComments/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
