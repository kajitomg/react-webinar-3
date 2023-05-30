import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import PropTypes from "prop-types";
import PageMenu from "../../components/page-menu";
import {languageTypes} from "../../store/language";

function Page(props) {

  return (
    <PageLayout>
      <Head title={props.title} words={props.words} setLanguage={props.setLanguage} language={props.language}/>
      <PageMenu sum={props.sum} amount={props.amount} openModalBasket={props.openModal} words={props.words} language={props.language}/>
      {props.children}
    </PageLayout>

  );
}
Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  openModal:PropTypes.func,
  words:PropTypes.object,
  language:PropTypes.string,
  setLanguage:PropTypes.func,
  amount:PropTypes.number,
  sum:PropTypes.number
};
Page.defaultProps = {
  title: '',
  openModal:() => {},
  setLanguage:() => {},
  sum: 0,
  amount: 0,
  language:languageTypes.russian
};
export default memo(Page);
