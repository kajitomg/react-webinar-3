import {memo} from 'react';
import PageLayout from "../../components/page-layout";
import Header from "../../containers/header";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import ProfileInfo from "../../components/profile-info";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";

function Profile() {
  const store = useStore()

  const select = useSelector(state => ({
    user:state.profile.info,
    waiting:state.profile.waiting
  }));

  useInit(() => {
    store.actions.profile.initProfile()
  },[])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileInfo name={select.user.profile?.name} email={select.user.email} phonenumber={select.user.profile?.phone}
                   labelTitle={t('profile.title')} waiting={select.waiting}/>
    </PageLayout>
  );
}

export default memo(Profile);
