import type { ApiSense } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import styles from './Sense.module.scss';
import { Translations } from '../Translations/Translations.tsx';
import { yi } from '@verterbank/messages';
import { RtlText } from '@verterbank/ui';

type SenseProps = {
  index: number;
  sense: ApiSense;
};
export function Sense({ index, sense }: SenseProps): ReactElement {
  return (
    <div key={sense.id} className={styles.sensesContainer}>
      {sense.glossYi && <RtlText variant="i">{sense.glossYi}</RtlText>}
      <div className={styles.header}>
        <strong>{index + 1}.</strong>
        <RtlText>{sense.definitionYi}</RtlText>
      </div>
      <section className={styles.senseIndentedSection}>
        <Translations translations={sense.translations} />
      </section>
      <section className={styles.senseIndentedSection}>
        <div className={styles.senseExamples}>
          <RtlText variant="h4">{yi.sections.examples}</RtlText>
          <ul>
            {sense.examples.map((example) => (
              <li key={example.id}>{example.textYi}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
