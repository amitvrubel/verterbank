import type { ReactElement } from 'react';
import type { ApiSense } from '../../dto/HeadwordDto.ts';
import { Sense } from './Sense.tsx';
import { yi } from '@verterbank/messages';
import { RtlText } from '@verterbank/ui';

interface SensesProps {
  senses: ApiSense[];
}
export function Senses({ senses }: SensesProps): ReactElement {
  return (
    <section>
      <RtlText variant="h4">{yi.sections.meanings}</RtlText>
      {senses.map((sense, index) => (
        <Sense key={sense.id} sense={sense} index={index} />
      ))}
    </section>
  );
}
