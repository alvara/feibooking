import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getSystemLanguage } from '@/helpers/getSystemLanguage';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Globe } from 'lucide-react';

function LanguageSwitcherButton() {
  const router = useRouter();
  const [language, setLanguage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLanguageChange = useCallback(
    (newLang: string) => {
      if (newLang !== router.locale) {
        localStorage.setItem('preferredLanguage', newLang);
        const { pathname, query } = router;
        router.replace({ pathname, query }, undefined, { locale: newLang, scroll: false });
      }
      setIsDialogOpen(false);
    },
    [router],
  );

  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
      handleLanguageChange(storedLang);
    } else {
      const systemLang = getSystemLanguage();
      handleLanguageChange(systemLang);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLanguage(router.locale || 'en');
  }, [router.locale]);

  return (
    <>
      <Button variant="outline" className="font-sans" onClick={() => setIsDialogOpen(true)}>
        <Globe className="w-4 h-4 mr-2" />
        <span>{language.toUpperCase()}</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
            <DialogDescription>Choose your preferred language</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => handleLanguageChange('ja')}
              className="justify-center text-foreground hover:text-foreground"
            >
              日本語
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLanguageChange('en')}
              className="justify-center text-foreground hover:text-foreground"
            >
              English
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LanguageSwitcherButton;
