import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import AuthLogin from "../../containers/auth-login";
import useInit from "../../hooks/use-init";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function Login() {
  const navigate = useNavigate()

  const select = useSelector(state => ({
    isLogin: state.user.isLogin
  }));

  useInit(() => {
    if(select.isLogin){
      navigate('/')
    }
  }, [select.isLogin]);

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