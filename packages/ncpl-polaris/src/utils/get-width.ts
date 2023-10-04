import { get } from 'lodash';
import { unref, type MaybeRef } from 'vue';

export function getWidth(
  value: MaybeRef<{ [key: string]: any } | number | null | undefined> = {},
  defaultWidth: number | null = 0,
  key = 'width',
) {
  value = unref(value)
  const width = typeof value === 'number' ? value : get(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}
