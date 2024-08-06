import { useShallow } from 'zustand/react/shallow';

import { useConveyorStore } from '@/Conveyor';
import { FormInput, FormValue, useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { useLoadingStore } from '@/Loading';
import { TableCell, type TableCellProps } from '@/Table';
import { DataLens, type ID, ScalarType } from '@/types';
import { DndSortableWrapper } from '@/utils';

import { useDataStore } from '@/Data';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableCellProps extends Omit<TableCellProps, 'columnId'> {
  field: string;
}

export const ModelTableCell = ({
  field,
  children,
  onKeyUp,
  onDoubleClick,
  ...tableCellProps
}: ModelTableCellProps) => {
  const dataId: ID = useDataStore((state) => state.id);
  const formFieldId = `${field}-${dataId}`;
  const formErrorMessageId = `${formFieldId}-error-message-${dataId}`;
  const isLoading = useLoadingStore((state) => state.isLoading);
  const { setLens, activeLens } = useLensesStore();
  const readOnly = useModelTableStore((state) => state.tableOptions?.readOnly);
  const draggable = useModelTableStore(
    (state) => state.tableOptions?.draggable ?? true,
  );
  const fieldType = useModelTableStore(
    (state) =>
      state.tableOptions?.columnOptions?.[field]?.type ?? ScalarType.STRING,
  );
  const fieldEditable = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.editable ?? true,
  );
  const fieldRules = useModelTableStore(
    (state) => state.tableOptions?.columnOptions?.[field]?.rules,
  );
  const inputFn = useConveyorStore(
    useShallow(
      (state) => state.typeOptions?.[fieldType]?.inputRenderFn ?? (() => null),
    ),
  );
  const valueFn = useConveyorStore(
    useShallow(
      (state) => state.typeOptions?.[fieldType]?.valueRenderFn ?? (() => null),
    ),
  );
  const reset = useFormStore((state) => state.reset);

  return (
    <DndSortableWrapper draggable={draggable} dndId={field} disabled>
      <TableCell
        columnId={field}
        onDoubleClick={(e) =>
          onDoubleClick
            ? onDoubleClick(e)
            : !readOnly &&
              fieldEditable &&
              activeLens === DataLens.VALUE &&
              setLens(DataLens.INPUT)
        }
        onKeyUp={(e) => {
          if (onKeyUp) {
            onKeyUp(e);
          } else if (e.key === 'Escape' && activeLens === DataLens.INPUT) {
            setLens(DataLens.VALUE);
            reset();
          }
        }}
        {...tableCellProps}
      >
        {children === undefined ? (
          fieldEditable ? (
            <>
              <Lens lens={DataLens.VALUE}>
                <FormValue name={field} render={valueFn} />
              </Lens>
              <Lens lens={DataLens.INPUT}>
                <FormInput
                  name={field}
                  rules={fieldRules}
                  render={({ inputProps, inputState, formState }) => {
                    const extraInputProps = Object.assign(inputProps, {
                      id: formFieldId,
                      disabled: isLoading,
                      required: !!fieldRules?.required,
                      'aria-describedby': !inputState?.invalid
                        ? `${formFieldId}`
                        : `${formFieldId} ${formErrorMessageId}`,
                      'aria-invalid': inputState?.invalid,
                    });
                    return inputFn({
                      inputProps: extraInputProps,
                      inputState,
                      formState,
                    });
                  }}
                />
              </Lens>
            </>
          ) : (
            <FormValue name={field} render={valueFn} />
          )
        ) : (
          children
        )}
        <div className='-right-4 absolute top-0 z-10 h-full w-8 cursor-ew-resize select-none'/>
      </TableCell>
    </DndSortableWrapper>
  );
};
