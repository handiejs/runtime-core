import dayjs, { ConfigType, OptionType, Dayjs } from 'dayjs';

function createMoment(
  date?: ConfigType,
  format?: OptionType,
  strictOrLocale?: boolean | string,
  strict?: boolean,
): Dayjs {
  return dayjs(date, format, strictOrLocale as any, strict);
}

export { createMoment };
