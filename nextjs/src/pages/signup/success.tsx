import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FadeInUp } from '@/components/animation/FadeInUp';
import { Section } from '@/components/container/Section';
// import { BrowseSlider } from '@/features/heroslider/BrowseSlider';

const SignupSuccessPage: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className="bg-cover bg-cover-auth grow">
      <PageHead pageTitle={t('account_signup_page.page_title')} />

      <Section className="flex flex-col-reverse items-center md:flex-row">
        <div className="basis-1/2">
          <div className="mx-8 my-12">
            <FadeInUp>Success</FadeInUp>
          </div>
        </div>
        <div className="basis-1/2"></div>
      </Section>
      {/* TODO: return the device browse slider when more than just phones is supported */}
      {/* <div className="bg-[#ffffff47] py-8">
        <Section>
          <FadeInUp>
            <h2>{t('home_page.browse_devices')}</h2>
            <BrowseSlider />
          </FadeInUp>
        </Section>
      </div> */}
    </div>
  );
};

export default SignupSuccessPage;
