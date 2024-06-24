import type { ComponentProps } from 'react';

import { Button } from '@/lib/components/ui/button';
import { cn } from '@/lib/utils';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { Spinner, useLoadingStore } from '@/Loading';
import { DataLens } from '@/types';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormActionsProps extends ComponentProps<'div'> {}

export const ModelFormActions = ({ className }: ModelFormActionsProps) => {
  const { isLoading, setIsLoading } = useLoadingStore();
  const reset = useFormStore((state) => state.reset);
  const setLens = useLensesStore((state) => state.setLens);
  const showActions = useModelFormStore((state) => state.showActions);
  const onCreate = useModelFormStore((state) => state.onCreate);
  const onUpdate = useModelFormStore((state) => state.onUpdate);
  const onDelete = useModelFormStore((state) => state.onDelete);
  const onSave = onCreate ?? onUpdate;
  const data = useModelFormStore((state) => state.data);
  const fields = useModelFormStore((state) => state.fields);

  const onEdit = () => setLens(DataLens.INPUT);
  const onCancelEdit = () => {
    setLens(DataLens.VALUE);
    reset();
  };
  const onDeleteHandler = async () => {
    onDelete && setIsLoading(true);
    await onDelete?.(data);
    setIsLoading(false);
  };

  return (
    showActions &&
    fields.length > 0 &&
    data && (
      <div className={cn('flex justify-center', className)}>
        <Lens lens={!isLoading && DataLens.VALUE}>
          <Button
            onClick={onEdit}
            onKeyUp={(e) => e.key === 'Enter' && onEdit()}
            variant="outline"
          >
            Edit
          </Button>
          {!onCreate && onDelete && (
            <Button
              onClick={onDeleteHandler}
              onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
              variant="outline-destructive"
            >
              Delete
            </Button>
          )}
        </Lens>
        <Lens lens={!isLoading && DataLens.INPUT}>
          {onSave && (
            <Button type="submit" variant="outline-success">
              {onCreate ? 'Create' : 'Save'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onCancelEdit}
            onKeyUp={(e) => e.key === 'Enter' && onCancelEdit()}
          >
            Cancel
          </Button>
        </Lens>
        {isLoading && <Spinner />}
      </div>
    )
  );
};
