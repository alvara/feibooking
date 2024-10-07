import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useTranslation from 'next-translate/useTranslation';
import { Home, Calendar, Dumbbell, Users, ShoppingBag } from 'lucide-react';
import { siteURL } from 'src/data/siteURL';

export function BottomNavBar() {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  const navItems = [
    { label: t('nav.home'), href: siteURL.home, icon: Home },
    { label: t('nav.events'), href: siteURL.events.list, icon: Calendar },
    { label: t('nav.fitness'), href: siteURL.fitness, icon: Dumbbell },
    { label: t('nav.community'), href: siteURL.community.list, icon: Users },
    { label: t('nav.shop'), href: siteURL.shop, icon: ShoppingBag },
  ];

  function getActiveValue(path: string) {
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
  }

  const activeValue = getActiveValue(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex justify-around">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center py-2 px-3 ${
              activeValue === item.href ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
