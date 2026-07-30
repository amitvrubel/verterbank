import type { ReactElement } from 'react';
import type { DraftNounLexeme } from '../../../api/lexeme.ts';
import { caseLabel, grammaticalGenderLabel, RtlText } from '@verterbank/ui';
import { yi } from '@verterbank/messages';
import styles from '../HeadwordCard.module.scss';
import classNames from 'classnames';
interface NounContentProps {
  noun: DraftNounLexeme;
  headword: string;
}

export function NounDraft({ noun, headword }: NounContentProps): ReactElement {
  function getGrammaticalGenderLabel() {
    switch (noun.grammaticalGender) {
      case 'FEM':
        return yi.grammar.feminine;
      case 'MASC':
        return yi.grammar.masculine;
      case 'NEUT':
        return yi.grammar.neuter;
    }
  }

  const plural = noun.forms.find((form) => form.number === 'PL');
  const declensions = noun.forms.filter((form) => !!form.case);

  return (
    <section>
      <RtlText variant="h4">{yi.sections.grammar}</RtlText>
      <div>
        <RtlText>
          {yi.grammar.grammaticalGender}: {getGrammaticalGenderLabel()}
        </RtlText>
      </div>
      <div>
        <RtlText variant="i">{grammaticalGenderLabel[noun.grammaticalGender]}</RtlText>
        &nbsp;
        <RtlText>{headword}</RtlText>
      </div>

      <div>
        <RtlText className={classNames({ [styles.missingLabel]: !plural })}>
          {yi.grammar.plural}: {plural?.valueOrth ?? yi.sofrim.missing}
        </RtlText>
      </div>

      {declensions.map((declension) => (
        <div>
          <RtlText>
            {caseLabel[declension.case]}: {declension.valueOrth}
          </RtlText>
        </div>
      ))}
    </section>
  );
}
