import type { Form, Sense as SenseDto } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import { Sense } from '../Sense/Sense.tsx';
import styles from './Lexeme.module.scss';

type LexemeProps = {
  forms: Form[];
  senses: SenseDto[];
};

export function Lexeme({ forms, senses }: LexemeProps): ReactElement {
  return (
    <div className={styles.lexemeContainer}>
      <div>
        <ul>
          {forms.map((form) => (
            <li key={form.id}>{form.valueOrth} </li>
          ))}
        </ul>
      </div>

      <section>
        <strong>באַטײַטן</strong>
        {senses.map((sense, index) => (
          <Sense key={sense.id} index={index} sense={sense} />
        ))}
      </section>
    </div>
  );
}
