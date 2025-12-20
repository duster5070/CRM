export function generateInvoiceNumber(): string {
  const timePart = Date.now().toString().slice(-5);
  const randomPart = Math.floor(10 + Math.random() * 90).toString();
  return timePart + randomPart; // still 7 digits
}
