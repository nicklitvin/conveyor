import { type ComponentProps, forwardRef } from 'react';

import { STableCell } from '@/lib/components/ui/table';

import { useDataStore } from '@/Data';
import { Slot } from '@/Slots';

export interface TableCellProps extends ComponentProps<typeof STableCell> {
  columnId: string;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ columnId, children, ...props }, ref) => {
    const data = useDataStore((state) => state[columnId]);
    const display = typeof data === 'object' ? JSON.stringify(data) : data;
    return (
      <Slot slotKey={columnId}>
        <STableCell ref={ref} {...props}>
          {children === undefined ? display : children}
        </STableCell>
      </Slot>
    );
  },
);
