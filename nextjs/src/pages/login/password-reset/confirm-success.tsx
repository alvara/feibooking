import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FadeInUp } from '@/components/animation/FadeInUp';
import { Section } from '@/components/container/Section';
import { ModalContainer } from '@/components/container/ModalContainer';
import { RebootButton } from '@/components/button/RebootButton';
import { siteURL } from 'src/data/siteURL';

const PasswordRequestPage: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="bg-cover bg-cover-auth bg-top sm:bg-[center_top_-1rem] bg-no-repeat grow">
        <PageHead pageTitle={t('password_change_success_page.page_title')} />

        <Section className="flex flex-col-reverse items-center py-56 md:gap-16 md:items-center md:flex-row">
          <div className="basis-1/2">
            <div className="">
              <FadeInUp>
                <ModalContainer>
                  <h1 className="text-3xl text-center">
                    {t('password_change_success_page.form_header')}
                  </h1>
                  <h2 className="text-xl text-center">
                    {t('password_change_success_page.form_subtitle')}
                  </h2>
                  <p className="text-center">{t('password_change_success_page.form_desc')}</p>
                  <div className="mt-4 text-center">
                    <RebootButton href={siteURL.login.main}>{t('form.login')}</RebootButton>
                  </div>{' '}
                </ModalContainer>
              </FadeInUp>
            </div>
          </div>
          <div className="basis-1/2"></div>
        </Section>
      </div>
    </>
  );
};

export default PasswordRequestPage;
