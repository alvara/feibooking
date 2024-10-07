import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

interface AboutPageProps {
  // data: {};
}

const AboutPage: NextPage<AboutPageProps> = () => {
  const { t } = useTranslation('about');
  return (
    <div>
      <PageHead pageTitle={t('page_title')} />
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {
      data: {},
    },
  };
}

export default AboutPage;
