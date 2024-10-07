import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FadeInUp } from '@/components/animation/FadeInUp';
import { Section } from '@/components/container/Section';
import { ModalContainer } from '@/components/container/ModalContainer';

const PasswordConfirmPage: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="bg-cover bg-cover-auth bg-[center_top_-1rem] grow">
        <PageHead pageTitle={t('password_change_page.page_title')} />

        <Section className="flex flex-col-reverse items-center py-32 md:gap-16 md:items-center md:flex-row">
          <div className="basis-1/2">
            <div className="">
              <FadeInUp>
                <ModalContainer className="!px-8 !py-4">
                  {/* <PasswordRecoveryUpdateForm /> */}
                  Password Recovery Update Form Goes Here
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

export default PasswordConfirmPage;
