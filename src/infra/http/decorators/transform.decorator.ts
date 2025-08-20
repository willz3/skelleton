import { Transform } from 'class-transformer';

export function OnlyNumbers() {
  return Transform(({ value }) => {
    if (!value) return value;
    const stringValue = String(value);
    return stringValue.replace(/\D/g, '');
  });
}
