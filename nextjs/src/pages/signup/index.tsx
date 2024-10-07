import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Section } from '@/components/container/Section';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { siteURL } from 'src/data/siteURL';

const Signup: NextPage = () => {
  const { t } = useTranslation('common');
  const { status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') router.push(siteURL.home);

  return (
    <div className="bg-cover bg-cover-auth bg-[center_top_-1rem] grow">
      <PageHead pageTitle={t('account_signup_page.page_title')} />

      <Section className="flex flex-col-reverse items-stretch h-full py-16 md:gap-16 md:items-center md:flex-row">
        <div className="basis-1/2">
          <div className="my-12 "></div>
        </div>
        <div className="basis-1/2">
          <h1 className="mb-0 text-center text-white md:text-start">Welcome to Reboot</h1>
        </div>
      </Section>
    </div>
  );
};

export default Signup;
