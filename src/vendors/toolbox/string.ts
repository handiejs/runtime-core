import { capitalize } from '@ntks/toolbox';

function toPascalCase(string: string): string {
  return string
    .split('-')
    .map(part => capitalize(part))
    .join('');
}

export { toPascalCase };
