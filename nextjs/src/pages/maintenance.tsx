import type { NextPageWithLayout } from '@/types/types';
import BlankLayout from '@/layouts/BlankLayout';

const MaintenancePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-16">
        <div className="container w-full text-center font-bold">
          <h1 className="text-2xl  mb-4">ただいまメンテナンス中です。</h1>
          <p className="mb-8">
            現在システムメンテナンスを行っているため、Rebootのサイトをご利用いただくことはできません。
            <br />
            しばらくしてからもう一度お試しください。
            <br />
            <br />
            ご不便、ご迷惑をおかけし申し訳ございませんが、よろしくお願いいたします。
          </p>

          <p>
            We are currently performing system maintenance, the Reboot website will be temporarily
            unavailable. <br />
            Please wait a few minutes and try again. <br /> <br />
            We apologize for the inconvenience and appreciate your understanding.
          </p>
        </div>
      </main>
    </div>
  );
};

MaintenancePage.getLayout = BlankLayout;

export default MaintenancePage;
