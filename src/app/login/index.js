import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthLogin from "../../containers/auth-login";
import {Navigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Login() {

  const select = useSelector(state => ({
    isLogin: state.user.isLogin,
    waiting: state.user.waiting
  }));

  if(!select.isLogin && select.waiting) return <Navigate to={'/'}/>

  const {t} = useTranslate();

  return (
      <PageLayout>
        <Header />
        <Head title={t('title')}>
          <LocaleSelect/>
        </Head>
        <Navigation/>
        <AuthLogin/>
      </PageLayout>
  );
}

export default memo(Login);