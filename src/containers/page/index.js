import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import PropTypes from "prop-types";
import PageMenu from "../../components/page-menu";
import useSelector from "../../store/hooks/use-selector";
import useModal from "../../store/hooks/use-modal";

function Page(props) {
  const {openModal} = useModal('basket')

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Закрытие модального окна
    openModal: openModal,
  }

  return (
    <PageLayout>
      <Head title={props.title}/>
      <PageMenu sum={select.sum} amount={select.amount} openModalBasket={callbacks.openModal}/>
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
