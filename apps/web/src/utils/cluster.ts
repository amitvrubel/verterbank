export function clusterYiddish(text: string): string[] {
  const clusters: string[] = [];
  let current = '';

  for (const char of text) {
    const isCombiningMark = /[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7]/.test(char);

    if (!current) {
      current = char;
      continue;
    }

    if (isCombiningMark) {
      current += char;
    } else {
      clusters.push(current);
      current = char;
    }
  }

  if (current) {
    clusters.push(current);
  }

  return clusters;
}
