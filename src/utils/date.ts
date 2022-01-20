import dayjs from 'dayjs';

function createMoment(
  date?: dayjs.ConfigType,
  format?: dayjs.OptionType,
  strictOrLocale?: boolean | string,
  strict?: boolean,
): dayjs.Dayjs {
  return dayjs(date, format, strictOrLocale as any, strict);
}

export { createMoment };
