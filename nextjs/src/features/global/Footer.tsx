import { FadeIn } from '@/components/animation/FadeIn';
import { BrandLogo } from '@/components/asset/BrandLogo';
import { siteURL } from 'src/data/siteURL';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { IconBrandInstagram, IconBrandFacebook, IconBrandX } from '@tabler/icons-react';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="w-full pt-12 pb-32 md:py-12 text-center bg-tertiary">
      <div className="container">
        <FadeIn>
          <div className="flex flex-col items-center justify-center">
            <Link href={siteURL.home} aria-label="Brand" className="mb-4">
              <BrandLogo textPosition="bottom" />
            </Link>

            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 border rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <IconBrandInstagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 border rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <IconBrandFacebook size={20} />
              </a>
              <a
                href="#"
                aria-label="X (formerly Twitter)"
                className="p-2 border rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <IconBrandX size={20} />
              </a>
            </div>

            <nav className="flex flex-row items-center gap-4 mb-4">
              <Link href={siteURL.termsOfUse} className="text-sm font-medium hover:underline">
                {t('footer.terms')}
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href={siteURL.privacyPolicy} className="text-sm font-medium hover:underline">
                {t('footer.privacy_policy')}
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link href={siteURL.about} className="text-sm font-medium hover:underline">
                {t('footer.about')}
              </Link>
            </nav>

            <div className="text-xs lg:text-sm">{t('footer.copywright')}</div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
