import type { ReactElement } from 'react';
import { partOfSpeechLabel } from '@verterbank/ui';
import { Label } from '../Label/Label.tsx';

interface PartOfSpeechLabelProps {
  className: string;
  onClick?: () => void;
  partOfSpeech: string;
}
export function PartOfSpeechLabel({
  className,
  partOfSpeech,
  onClick,
}: PartOfSpeechLabelProps): ReactElement {
  function getPartOfSpeechLabel(partOfSpeech: string): string {
    return partOfSpeechLabel[partOfSpeech as keyof typeof partOfSpeechLabel] ?? partOfSpeech;
  }

  return (
    <Label className={className} onClick={onClick}>
      {getPartOfSpeechLabel(partOfSpeech)}
    </Label>
  );
}
