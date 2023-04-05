export function convertDateToSQL(date: Date): string | null {
  if ( !date || (date instanceof Date && isNaN(date.getDate())) )
    return null;

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
}