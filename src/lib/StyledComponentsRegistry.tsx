'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type Props = {
  children: ReactNode;
};

type StyleSheetWithClearTag = ServerStyleSheet['instance'] & {
  clearTag?: () => void;
};

const StyledComponentsRegistry = ({ children }: Props) => {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    // styled-components exposes `clearTag` at runtime, but not in the public type.
    (sheet.instance as StyleSheetWithClearTag).clearTag?.();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>;
};

export default StyledComponentsRegistry;
