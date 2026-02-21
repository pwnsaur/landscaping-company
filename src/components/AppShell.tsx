'use client';

import React from 'react';

import ErrorBoundary from '@/utils/ErrorBoundary';
import Layout from '@components/Layout';

type Props = {
  children: React.ReactNode;
};

const AppShell = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
};

export default AppShell;
