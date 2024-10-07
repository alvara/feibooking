import { useState } from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '@/components/seo/PageHead';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { IconBrandInstagram, IconBrandLine, IconArrowLeft } from '@tabler/icons-react';
import BlankLayout from '@/layouts/BlankLayout';
import type { ReactElement } from 'react';
import LanguageSwitcherButton from '@/components/button/LanguageSwitcherButton';
import { BrandLogo } from '@/components/asset/BrandLogo';
import Link from 'next/link';

function Login() {
  const { t } = useTranslation('login');
  const router = useRouter();
  const { callbackUrl = '/' } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Implement email/password login logic here
    console.log('Login with:', email, password);
    router.push(callbackUrl as string);
  }

  function handleSocialLogin(provider: string) {
    // Implement social login logic here
    console.log('Social login with:', provider);
    router.push(callbackUrl as string);
  }

  function handleBack() {
    if (typeof callbackUrl === 'string' && callbackUrl !== '/') {
      router.push(callbackUrl);
    } else {
      router.back();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-cover-auth bg-[center_top_-1rem] relative">
      <PageHead pageTitle={t('login_page.page_title')} />

      <Button variant="ghost" onClick={handleBack} className="absolute top-4 left-4">
        <IconArrowLeft className="mr-2 h-4 w-4" />
        {t('login_page.back')}
      </Button>

      <div className="absolute top-4 right-4">
        <LanguageSwitcherButton />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <BrandLogo
            className="w-full h-auto max-w-[150px] mb-6"
            showText={true}
            textPosition="bottom"
            textClassName="mt-2 text-center"
          />
          <CardTitle className="text-2xl font-bold">{t('login_page.form_title')}</CardTitle>
          <CardDescription>{t('login_page.form_description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login_page.email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('login_page.email_placeholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('login_page.password_label')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('login_page.password_placeholder')}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              {t('login_page.submit_button')}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground">
              {t('login_page.or')}
            </span>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" onClick={() => handleSocialLogin('line')} className="w-full">
              <IconBrandLine className="mr-2 h-4 w-4" />
              {t('login_page.line_login')}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('instagram')}
              className="w-full"
            >
              <IconBrandInstagram className="mr-2 h-4 w-4" />
              {t('login_page.instagram_login')}
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center w-full text-muted-foreground">
            {t('login_page.no_account')}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              {t('login_page.sign_up')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return BlankLayout(page);
};

export default Login;
