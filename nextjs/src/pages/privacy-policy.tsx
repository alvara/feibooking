import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

const PrivacyPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <PageHead pageTitle={t('privacy_page.page_title')} />
    </div>
  );
};

export default PrivacyPage;
