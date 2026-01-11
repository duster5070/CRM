export function convertIsoDateToStringDate(isoString: string | Date): string | null {
  if (!isoString) return null;
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
}
