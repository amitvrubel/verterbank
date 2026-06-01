import { type ReactElement } from 'react';
import type { NounLexeme } from '../../view-models/Lexeme.ts';
import { KeyValueGrid, type KeyValueItem } from '../KevValueGrid/KeyValueGrid.tsx';

import { getNounInflections } from '../../utils/getNounInflections.ts';
import { caseLabel } from '../../enum/CaseEnum.ts';
import { yi } from '@verterbank/messages';
import { RtlText } from '@verterbank/ui';

interface NounProps {
  headwordOrth: string;
  noun: NounLexeme;
}

export function Noun({ headwordOrth, noun }: NounProps): ReactElement {
  const declensions: KeyValueItem[] = getNounInflections(noun, headwordOrth).map((item) => {
    if (item.kind === 'plural') {
      return {
        label: <RtlText>{yi.grammar.plural}</RtlText>,
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
      <RtlText variant="h4">{yi.sections.grammar}</RtlText>
      {declensions && <KeyValueGrid items={declensions} />}
    </section>
  );
}
