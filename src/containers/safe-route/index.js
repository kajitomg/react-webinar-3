import {memo} from "react";
import PropTypes from 'prop-types';
import {Navigate} from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Header from "../header";
import Head from "../../components/head";
import LocaleSelect from "../locale-select";
import Navigation from "../navigation";
import useTranslate from "../../hooks/use-translate";

function SafeRoute(props){
  const {t} = useTranslate();

  if(props.isWaiting) return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
    </PageLayout>
  )

  if(props.condition) return <Navigate to={props.redirect}/>

  return props.element
}

SafeRoute.propTypes = {
  condition:PropTypes.bool,
  redirect:PropTypes.string,
  element:PropTypes.node.isRequired,
  isWaiting:PropTypes.bool
};

SafeRoute.defaultProps = {
  condition:false,
  redirect:'/',
  isWaiting:false
}

export default memo(SafeRoute);