import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BrandLogo } from '@/components/asset/BrandLogo';
import LanguageSwitcherButton from '@/components/button/LanguageSwitcherButton';
import LocationSwitcherButton from '@/components/button/LocationSwitcherButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Menu, Bell, CalendarPlus, Newspaper, MessageCircle } from 'lucide-react';
import { siteURL } from 'src/data/siteURL';

export function Navbar() {
  const { status } = useSession();
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const isAuthenticated = status === 'authenticated';

  const navItems = [
    { label: 'nav.home', href: siteURL.home },
    { label: 'nav.events', href: siteURL.events.list },
    { label: 'nav.fitness', href: siteURL.fitness },
    { label: 'nav.community', href: siteURL.community.list },
    { label: 'nav.shop', href: siteURL.shop },
  ];

  const getActiveValue = (path: string) => {
    if (path === '/' || path === '') return siteURL.home;

    const topLevelPaths = Object.values(siteURL).filter(
      (value): value is string => typeof value === 'string',
    );

    const exactMatch = topLevelPaths.find((item) => item === path);
    if (exactMatch) return exactMatch;

    for (const value of Object.values(siteURL)) {
      if (typeof value === 'object') {
        for (const subValue of Object.values(value)) {
          if (typeof subValue === 'string' && path.startsWith(subValue)) {
            return subValue;
          }
        }
      }
    }

    const partialMatch = topLevelPaths.find((item) => path.startsWith(item) && item !== '/');
    if (partialMatch) return partialMatch;

    return siteURL.home;
  };

  useEffect(() => {
    const newActiveTab = getActiveValue(pathname);
    setActiveTab(newActiveTab);
  }, [pathname]);

  return (
    <nav>
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex-grow">
          <Link href={siteURL.home} className="block">
            <BrandLogo
              className="w-full h-auto max-w-[200px]"
              showText={true}
              textClassName="hidden md:inline"
            />
          </Link>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <LanguageSwitcherButton />
          <LocationSwitcherButton />

          {/* Notification Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t('notifications.title')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CalendarPlus className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{t('notifications.new_event')}</span>
                  <span className="text-sm text-muted-foreground">
                    {t('notifications.event_description')}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Newspaper className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{t('notifications.community_news')}</span>
                  <span className="text-sm text-muted-foreground">
                    {t('notifications.news_description')}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{t('notifications.event_update')}</span>
                  <span className="text-sm text-muted-foreground">
                    {t('notifications.update_description')}
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={siteURL.notifications} className="w-full text-center">
                  {t('notifications.view_all')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>{t(item.label)}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={siteURL.home}>{t('nav.cta_app')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={siteURL.home}>{isAuthenticated ? t('nav.admin') : t('nav.login')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex space-x-2">
            {isAuthenticated ? (
              <Button variant="ghost" asChild>
                <Link href={siteURL.home}>{t('nav.admin')}</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href={siteURL.login.main}>{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link href={siteURL.signup}>{t('nav.signup')}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:block lg:mb-4">
        {activeTab !== null && (
          <Tabs value={activeTab} defaultValue={activeTab}>
            <TabsList className="w-full justify-stretch">
              {navItems.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={String(item.href)}
                  asChild
                  className="flex-1"
                  data-state={activeTab === String(item.href) ? 'active' : 'inactive'}
                >
                  <Link href={String(item.href)}>{t(item.label)}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>
    </nav>
  );
}
