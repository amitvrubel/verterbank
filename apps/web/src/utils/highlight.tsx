import type { ReactNode } from 'react';
import { normalize } from './normalizer.ts';
import { clusterYiddish } from './cluster.ts';

export function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) return text;

  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return text;

  const clusters = clusterYiddish(text);

  let normalizedText = '';
  const normalizedToClusterIndex: number[] = [];

  clusters.forEach((cluster, clusterIndex) => {
    const normalizedCluster = normalize(cluster);

    for (const char of normalizedCluster) {
      normalizedText += char;
      normalizedToClusterIndex.push(clusterIndex);
    }
  });

  const matchStart = normalizedText.indexOf(normalizedQuery);
  if (matchStart === -1) return text;

  const matchEnd = matchStart + normalizedQuery.length - 1;

  const startClusterIndex = normalizedToClusterIndex[matchStart];
  const endClusterIndex = normalizedToClusterIndex[matchEnd];

  const before = clusters.slice(0, startClusterIndex).join('');
  const match = clusters.slice(startClusterIndex, endClusterIndex + 1).join('');
  const after = clusters.slice(endClusterIndex + 1).join('');

  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  );
}
