import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FadeInUp } from '@/components/animation/FadeInUp';
import { Section } from '@/components/container/Section';

const FailureEmailVerifyPage: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className="h-full bg-cover bg-cover-auth">
      <PageHead pageTitle={t('account_signup_page.page_title')} />

      <Section className="flex flex-col-reverse items-center h-full py-56 md:flex-row">
        <div className="basis-1/2">
          <div className="mx-8 my-12">
            <FadeInUp>
              <h1>Failure</h1>
            </FadeInUp>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FailureEmailVerifyPage;
