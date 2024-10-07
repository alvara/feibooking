export type UserType = 'user' | 'admin';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { Session } from 'next-auth';
import type { AppProps } from 'next/app';

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface PageOptions {
  title?: string;
  useBackButton?: boolean;
  rightNavMenu?: ReactNode;
}

export type NextPageWithLayout<
  P = unknown, // Page Props
  IP = P, // Initial Props
  PO = PageOptions, // Page Options
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => React.ReactNode;
  pageOptions?: PO;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session?: Session;
  requiredProp: boolean;
};

export interface JwtToken {
  access: string;
  refresh: string;
}

export interface ApiError extends Error {
  name: string;
  url: string;
  status: number;
  statusText: string;
  body: string;
  request: {
    method: string;
    url: string;
    path: {
      id: number;
    };
  };
}

export type AccountSignupFormData = {
  email: string;
  password: string;
  invite_code?: string;
};

// structure of the possible queryParams for the products page
export interface QueryParams {
  category?: string[];
  series?: string[];
  brand?: string[];
  condition?: string[];
  availability?: string[];
  sort?: sortingOptionsValues;
}

export interface QueryFiltersType {
  series: string[];
  brand: string[];
  condition: string[];
  availability: string[];
}

// query params sorting values allowed
export type sortingOptionsValues = '' | '-price' | 'price';

// query params options for radio buttons
export type sortingOptionsType = {
  value: sortingOptionsValues;
  label: string;
};

export interface PaymentDetailsType {
  addressLine1: string;
  addressLine2: string;
  locality: string;
  postalCode: string;
  country: string;
  cardHolderName: string;
  administrative_district_level_1: string;
}

export interface CustomPointTransactionItem {
  id: number;
  points: number;
  transaction_type: 'points_claimed' | 'points_redeemed' | 'points_expired';
  transaction_date: string | null;
  title: string;
  note: string;
}
