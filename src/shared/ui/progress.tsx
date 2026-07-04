import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/src/shared/lib/class-names';

enum IndicatorColors {
  '#767676' = 20,
  '#0288D1' = 40,
  '#2E7D32' = 60,
  '#FFB800' = 80,
  '#C63031' = 100,
}

enum ScaleColors {
  '#CACACA' = 20,
  '#9ED1ED' = 40,
  '#AFCDB1' = 60,
  '#FFE49E' = 80,
  '#C63031' = 100,
}

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative flex h-1 w-20 items-center overflow-x-hidden rounded-full',
        className
      )}
      style={{ backgroundColor: ScaleColors[value || 100] }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="size-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: IndicatorColors[value || 100],
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
