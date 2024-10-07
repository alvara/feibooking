import { PageHead } from '@/components/seo/PageHead';
import type { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { RebootButton } from '@/components/button/RebootButton';
import { siteURL } from 'src/data/siteURL';
import { motion } from 'framer-motion';
import { BorderBoxWithTitle } from '@/components/box/BorderBoxWithTitle';
import { MenuLink } from '@/components/links/MenuLink';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

const AccountPage: NextPage = () => {
  const { t } = useTranslation('common');
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     const callbackUrl = encodeURIComponent(siteURL.account.main);
  //     router.push(`${siteURL.login.main}?callbackUrl=${callbackUrl}`);
  //   }
  // }, [status, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="sm:mx-4 ">
      <PageHead pageTitle={t('account_page.page_title')} />

      <motion.div
        className="mx-4 lg:mx-auto lg:container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2" variants={containerVariants}>
          {/**************************************************
           *  MY TECH
           ***************************************************/}
          <motion.div variants={itemVariants}>
            <BorderBoxWithTitle
              title={
                <>
                  <img
                    src="/img/icon-phone.png"
                    alt="icon-mail"
                    className="inline-block w-8 h-8 mr-2"
                  />
                  {t('account_page.my_tech')}
                </>
              }
            >
              <ul className="flex flex-col gap-4 pb-4 list-disc list-inside">
                <li>{t('account_page.my_tech_list1')}</li>
                <li>{t('account_page.my_tech_list2')}</li>
                <li>{t('account_page.my_tech_list3')}</li>
              </ul>
              <RebootButton variant="contained" href={siteURL.account.myTech} size="sm">
                {t('account_page.my_tech_button')}
              </RebootButton>
            </BorderBoxWithTitle>
          </motion.div>

          {/**************************************************
           *
           *  BILLING MANAGEMENT
           *
           ***************************************************/}
          <motion.div variants={itemVariants}>
            <BorderBoxWithTitle title={t('account_page.billing_management')}>
              {/* Invoices */}
              <MenuLink
                href={siteURL.account.managePayments}
                icon={<img src="/img/icon-toolkit.png" alt="icon-toolkit" />}
                label={t('account_page.manage_payments')}
              />

              {/* Billing Methods */}
              <MenuLink
                href={siteURL.account.manageBilling}
                icon={<img src="/img/icon-card.png" alt="icon-card" />}
                label={t('account_page.manage_billing_methods')}
              />
            </BorderBoxWithTitle>
          </motion.div>

          {/**************************************************
           *
           *  ACCOUNT SETTINGS
           *
           ***************************************************/}
          <motion.div variants={itemVariants}>
            <BorderBoxWithTitle title={t('account_page.account_setting')}>
              {/* Email address, Password */}
              <MenuLink
                href={siteURL.account.updateEmailPassword}
                label={t('account_page.email_password')}
                icon={<img src="/img/icon-mail.png" alt="icon-mail" />}
              />

              {/* Notifications */}
              <MenuLink
                href={siteURL.account.updateNotifications}
                label={t('account_page.notifications')}
                icon={<img src="/img/icon-bell.png" alt="icon-bell" />}
              />

              {/* Personal Information */}
              <MenuLink
                href={siteURL.account.updatePersonalInfo}
                label={t('account_page.personal_information')}
                icon={<img src="/img/icon-user.png" alt="icon-user" />}
              />
            </BorderBoxWithTitle>
          </motion.div>

          {/**************************************************
           *
           *  POINT & CAMPAIGN
           *
           ***************************************************/}
          <motion.div variants={itemVariants}>
            <BorderBoxWithTitle title={t('account_page.point_campaign')}>
              <MenuLink
                href={siteURL.account.main}
                icon={<img src="/img/icon-award.png" alt="icon-award" />}
                label={t('account_page.my_reboot_points')}
              />

              <MenuLink
                href={siteURL.home}
                icon={<img src="/img/icon-gift.png" alt="icon-gift" />}
                label={t('account_page.invite_program')}
              />
            </BorderBoxWithTitle>
          </motion.div>

          {/**************************************************
           *  SUPPORT & HELP
           ***************************************************/}
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-1"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <BorderBoxWithTitle title={t('account_page.support')}>
                {/* Help Center */}
                <MenuLink
                  target="_blank"
                  href={siteURL.home}
                  icon={<img src="/img/icon-toolkit.png" alt="icon-toolkit" />}
                  label={t('account_page.help_center')}
                />

                {/* Unsubscribe */}
                <MenuLink
                  target="_blank"
                  href={siteURL.home}
                  icon={<img src="/img/icon-userremove.png" alt="icon-userremove" />}
                  label={t('account_page.unsubscribe')}
                />
              </BorderBoxWithTitle>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AccountPage;
