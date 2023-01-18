export function transformFields(fields: { [key: string]: any }): { [key: string]: boolean } {
  Object.keys(fields).forEach((key) => (fields[key] = true));
  return fields;
}
