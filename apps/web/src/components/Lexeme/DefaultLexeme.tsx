import type { GenericLexeme } from '../../view-models/Lexeme.ts';
import styles from './Lexeme.module.scss';

import { Senses } from '../Sense/Senses.tsx';

interface GenericLexemeProps {
  generic: GenericLexeme;
}
export function DefaultLexeme({ generic }: GenericLexemeProps) {
  return (
    <div className={styles.lexemeContainer}>
      <div>
        <ul>
          {generic.forms.map((form) => (
            <li key={form.id}>{form.valueOrth} </li>
          ))}
        </ul>
      </div>
      <Senses senses={generic.senses} />
    </div>
  );
}
