export function isAlefBeys(input: string): boolean {
  return /[\u0590-\u05FF]/.test(input);
}
