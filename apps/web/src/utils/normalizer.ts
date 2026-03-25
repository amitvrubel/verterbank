export function normalize(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7]/g, '')
    .normalize('NFC')
    .replace(/\u05F2/g, 'יי')
    .replace(/\u05F1/g, 'וי')
    .replace(/\u05F0/g, 'וו');
}
