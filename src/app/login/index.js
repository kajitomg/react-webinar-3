import {memo, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthLogin from "../../containers/auth-login";
import useStore from "../../hooks/use-store";

function Login() {
  const store = useStore()

  useEffect(() => {
    return () => store.actions.user.clearError()
  },[])

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