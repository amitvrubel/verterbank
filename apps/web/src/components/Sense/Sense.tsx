import type { Sense } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import styles from './Sense.module.scss';
import { Translations } from '../Translations/Translations.tsx';

type SenseProps = {
  index: number;
  sense: Sense;
};
export function Sense({ index, sense }: SenseProps): ReactElement {
  return (
    <div key={sense.id} className={styles.container}>
      <div className={styles.header}>
        <strong>{index + 1}.</strong>
        <span>{sense.definitionYi}</span>
      </div>
      <Translations translations={sense.translations} />
      <div className={styles.section}>
        <strong>Examples:</strong>
        <ul>
          {sense.examples.map((example) => (
            <li key={example.id}>{example.textYi}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
