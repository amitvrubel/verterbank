import { type ReactElement } from 'react';
import type { NounLexeme } from '../../view-models/Lexeme.ts';
import { RtlText } from '../RtlText/RtlText.tsx';
import { yi } from '../../i18n/messages.ts';
import { KeyValueGrid, type KeyValueItem } from '../KevValueGrid/KeyValueGrid.tsx';

import { getNounInflections } from '../../utils/getNounInflections.ts';
import { caseLabel } from '../../enum/CaseEnum.ts';

interface NounProps {
  headwordOrth: string;
  noun: NounLexeme;
}

export function Noun({ headwordOrth, noun }: NounProps): ReactElement {
  const declensions: KeyValueItem[] = getNounInflections(noun, headwordOrth).map((item) => {
    if (item.kind === 'plural') {
      return {
        label: <RtlText>{yi.plural}</RtlText>,
        value: <RtlText>{`${item.determiner} ${item.valueOrth}`}</RtlText>,
      };
    }

    return {
      label: <RtlText>{caseLabel[item.case]}</RtlText>,
      value: <RtlText>{`${item.determiner} ${item.valueOrth}`}</RtlText>,
    };
  });
  return (
    <section>
      <RtlText variant="h4">{yi.grammar}</RtlText>
      {declensions && <KeyValueGrid items={declensions} />}
    </section>
  );
}
