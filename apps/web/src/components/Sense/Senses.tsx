import type { ReactElement } from 'react';
import type { ApiSense } from '../../dto/HeadwordDto.ts';
import { RtlText } from '../RtlText/RtlText.tsx';
import { yi } from '../../i18n/messages.ts';
import { Sense } from './Sense.tsx';

interface SensesProps {
  senses: ApiSense[];
}
export function Senses({ senses }: SensesProps): ReactElement {
  return (
    <section>
      <RtlText variant="h4">{yi.meanings}</RtlText>
      {senses.map((sense, index) => (
        <Sense key={sense.id} sense={sense} index={index} />
      ))}
    </section>
  );
}
