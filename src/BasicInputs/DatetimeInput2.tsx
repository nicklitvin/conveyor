import {
    type ComponentPropsWithoutRef,
    type ElementRef,
    forwardRef,
  } from 'react';
  
import type { FormControlChildProps } from '@/Form';
import { DateTimePicker } from '@/lib/components/ui/date-time-picker';
  
  export const DatetimeInput2 = forwardRef<
    ElementRef<typeof DateTimePicker>,
    FormControlChildProps & ComponentPropsWithoutRef<typeof DateTimePicker>
  >(({ value, className, ...inputProps }, ref) => {
    return (
      <DateTimePicker {...inputProps}/>
    );
  });
  