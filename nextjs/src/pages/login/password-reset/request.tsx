import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { FadeInUp } from '@/components/animation/FadeInUp';
import { Section } from '@/components/container/Section';
import { ModalContainer } from '@/components/container/ModalContainer';

const PasswordRequestPage: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="bg-cover bg-cover-auth bg-[center_top_-1rem] grow">
        <PageHead pageTitle={t('password_request_page.page_title')} />

        <Section className="flex flex-col-reverse items-center py-36 md:gap-16 md:items-center md:flex-row">
          <div className="basis-1/2">
            <div className="">
              <FadeInUp>
                <ModalContainer className="!py-0 !px-4">
                  Password Recovery Goes Here
                  {/* <PasswordRecoveryRequestForm /> */}
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
