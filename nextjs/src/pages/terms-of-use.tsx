import { Section } from '@/components/container/Section';
import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

const TermsPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <PageHead pageTitle={t('terms_page.page_title')} />
      <Section>terms of use goes here</Section>
    </div>
  );
};

export default TermsPage;
