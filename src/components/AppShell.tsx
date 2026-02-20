'use client';

import React from 'react';

import LoadingScreen from '@/components/LoadingScreen';
import ErrorBoundary from '@/utils/ErrorBoundary';
import { useLoading } from '@/utils/hooks/useLoading';
import Layout from '@components/Layout';

type Props = {
  children: React.ReactNode;
};

const AppShell = ({ children }: Props) => {
  const loading = useLoading();

  return (
    <ErrorBoundary>
      {loading && <LoadingScreen />}
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
};

export default AppShell;
