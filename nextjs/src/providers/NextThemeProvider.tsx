import { ThemeProvider } from 'next-themes';

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
    // attribute="data-theme"
    >
      {children}
    </ThemeProvider>
  );
}
