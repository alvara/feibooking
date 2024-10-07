import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

const Page404: NextPage = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-white bg-cover bg-banner-404 grow">
      <div>
        <h1 className="my-0">{t('notfound.title')}</h1>
        <p>{t('notfound.description')}</p>
      </div>
    </div>
  );
};

export default Page404;
