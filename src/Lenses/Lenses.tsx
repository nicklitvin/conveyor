import { type ReactNode, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsMounted } from '@/hooks';

import {
  type LensType,
  type LensesStore,
  LensesStoreContext,
} from './LensesStoreContext';

export interface LensesProps extends Partial<LensesStore> {
  initialLens?: LensType;
  children?: ReactNode;
}

export const Lenses = ({
  initialLens,
  activeLens,
  AvailableLenses = {},
  children,
}: LensesProps) => {
  const [lensesStore] = useState(
    new Store<LensesStore>({
      activeLens: activeLens ?? initialLens,
      AvailableLenses,
    }),
  );

  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted.current && activeLens !== undefined) {
      lensesStore.setState((state) => ({ ...state, activeLens }));
    }
  }, [activeLens]);

  return (
    <LensesStoreContext.Provider value={lensesStore}>
      {children}
    </LensesStoreContext.Provider>
  );
};
