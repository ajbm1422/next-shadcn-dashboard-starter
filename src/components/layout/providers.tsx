'use client';
import React from 'react';
import { AccountProvider } from '@/lib/account-context';
import { ActiveThemeProvider } from '../themes/active-theme';
import QueryProvider from './query-provider';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <AccountProvider>
          <QueryProvider>{children}</QueryProvider>
        </AccountProvider>
      </ActiveThemeProvider>
    </>
  );
}
