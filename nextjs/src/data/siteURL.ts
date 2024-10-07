export const siteURL = {
  // PROFILE URLS
  profile: (id: string | number) => `/${id}`,

  // FULL SITE URLS
  home: '/',
  howItWorks: '/how-it-works',
  about: '/about',
  services: '/services',
  contact: '/contact',
  fitness: '/fitness',
  shop: '/shop',
  notifications: '/notifications',

  events: {
    list: '/events',
    today: '/events?date=today',
    thisWeek: '/events?date=this-week',
    create: '/events/create',
    details: (slug: string | number) => `/events/${slug}`,
    queryTags: (queries?: string[]) => `/events?tags=${queries?.join('&')}`,
  },

  community: {
    list: '/community',
    new: '/community?tags=new',
    coaches: '/community?tags=coaches',
    details: (profileHandle: string) => `/${profileHandle}`,
    create: '/community/create',
    queryTags: (queries?: string[]) => `/community?tags=${queries?.join('&')}`,
  },

  news: {
    list: '/news',
    details: (id: string | number) => `/news/${id}`,
    create: '/news/create',
    queryTags: (queries?: string[]) => `/news?tags=${queries?.join('&')}`,
  },

  opportunities: {
    list: '/opportunities',
    details: (id: string | number) => `/opportunities/${id}`,
    create: '/opportunities/create',
  },

  // AUTHENTICATION
  signup: '/signup',
  login: {
    main: '/login',
    passwordRecoveryRequest: '/login/password-reset/request',
    passwordRecoveryRequestSuccess: '/login/password-reset/request-success',
    passwordRecoveryConfirm: '/login/password-reset/confirm',
    passwordRecoveryConfirmSuccess: '/login/password-reset/confirm-success',
  },
  account: {
    main: '/account',
    myTech: '/account/my-tech',
    managePayments: '/account/manage-payments',
    manageBilling: '/account/manage-billing',
    makePayment: (slug: string | number) => `/account/make-payment/?slug=${slug}`,
    updateEmailPassword: '/account/update-email-password',
    updateNotifications: '/account/update-notifications',
    updatePersonalInfo: '/account/personal-information',
    updateAddress: '/account/update-address',
    updateAddressSuccess: '/account/update-address-success',
  },
  termsOfUse: '/terms-of-use',
  privacyPolicy: '/privacy-policy',

  external: {
    support_main: process.env.NEXT_PUBLIC_SUPPORT_MAIN_URL,
    support_personal_info: process.env.NEXT_PUBLIC_SUPPORT_PERSONAL_INFO_URL,
    support_remove_account: process.env.NEXT_PUBLIC_SUPPORT_REMOVE_ACCOUNT_URL,
    support_manage_subscription: process.env.NEXT_PUBLIC_SUPPORT_SUBSCRIPTION_MANAGEMENT_URL,
  },
};

export const getLocalizedURL = (path: string, locale: string) => {
  return `/${locale}${path}`;
};
