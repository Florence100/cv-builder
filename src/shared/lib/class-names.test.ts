import { describe, it, expect } from 'vitest';
import { cn } from './class-names';

describe('cn utility function', () => {
  it('merges basic string classes together', () => {
    expect(cn('base-class', 'active-class')).toBe('base-class active-class');
  });

  it('filters out falsy values (clsx behavior)', () => {
    expect(cn('class-a', false && 'class-b', undefined, null, 'class-c')).toBe('class-a class-c');
  });

  it('supports arrays and objects (clsx behavior)', () => {
    expect(
      cn(
        ['class-array-1', 'class-array-2'],
        { 'class-obj-true': true, 'class-obj-false': false },
        'class-string'
      )
    ).toBe('class-array-1 class-array-2 class-obj-true class-string');
  });

  it('resolves Tailwind CSS class conflicts (tailwind-merge behavior)', () => {
    expect(cn('bg-red-500 text-white', 'bg-blue-500')).toBe('text-white bg-blue-500');

    expect(cn('px-2 py-1 text-sm', 'p-4')).toBe('text-sm p-4');
  });

  it('handles complex combinations of conditions and conflicts', () => {
    const isError = true;
    const isSmall = false;

    expect(
      cn('p-4 bg-gray-100 text-black', isError && 'bg-red-500 text-white', isSmall && 'p-2', {
        'border border-red-500': isError,
      })
    ).toBe('p-4 bg-red-500 text-white border border-red-500');
  });
});
