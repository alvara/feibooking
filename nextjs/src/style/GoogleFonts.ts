import { Inter, Montserrat, Noto_Sans_JP, Noto_Sans_Thai } from 'next/font/google';

// RECOMMENDED UNIVERSAL FONTS
export const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// RECOMMENDED HEADING FONTS
export const montserrat = Montserrat({
  // weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrral',
});

// RECOMMENDED BODY FONTS
export const notoSansJp = Noto_Sans_JP({
  // weight: ["100'600','700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  display: 'swap',
  variable: '--font-noto-sans-thai',
});
