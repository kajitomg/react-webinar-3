import {memo, useCallback} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import PropTypes from "prop-types";
import PageMenu from "../page-menu";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Page(props) {

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модального окна корзины
    openModalBasket: useCallback(() => store.actions.modals.openModal('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={props.title}/>
      <PageMenu sum={select.sum} amount={select.amount} openModalBasket={callbacks.openModalBasket}/>
      {props.children}
    </PageLayout>

  );
}
Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
Page.defaultProps = {
  title: '',
};
export default memo(Page);
