'use client';

import { ReactNode } from 'react';
import { LoaderState } from 'contexts/LoadingState';

interface ContextProviderProps {
  children: ReactNode;
}

/**
 * @Layout
 * @function @ContextProvider
 **/

function ContextProvider({ children }: ContextProviderProps) {
  return <LoaderState value={{ show: false }}>{children}</LoaderState>;
}

export default ContextProvider;