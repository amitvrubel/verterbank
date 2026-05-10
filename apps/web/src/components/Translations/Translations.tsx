import type { Translation } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import styles from './Translations.module.scss';
import { LanguagesEnum } from '../../enum/LanguagesEnum.ts';
import { RtlText } from '../RtlText/RtlText.tsx';
import { yi } from '../../i18n/messages.ts';

type TranslationsProps = {
  translations: Translation[];
};

export function Translations({ translations }: TranslationsProps): ReactElement {
  const translationsByLanguage = translations.reduce<Record<string, string[]>>(
    (acc, translation) => {
      if (!acc[translation.lang]) {
        acc[translation.lang] = [];
      }
      acc[translation.lang].push(translation.text);
      return acc;
    },
    {},
  );

  return (
    <div className={styles.translationContainer}>
      <RtlText variant="strong">{yi.translations}</RtlText>
      {Object.entries(translationsByLanguage).map(([lang, text]) => (
        <div key={lang} className={styles.translationTable}>
          <div className={styles.translationLanguage}>
            <strong>{LanguagesEnum[lang]}</strong>
          </div>
          <div className={styles.translationTranslations}>
            {text.map((text, index) => (
              <span key={`${lang}-${index}`} dir="ltr">
                {text}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
