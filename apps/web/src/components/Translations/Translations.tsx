import type { ApiTranslation } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import styles from './Translations.module.scss';
import { LanguagesEnum } from '../../enum/LanguagesEnum.ts';
import { KeyValueGrid, type KeyValueItem } from '../KevValueGrid/KeyValueGrid.tsx';
import { yi } from '@verterbank/messages';
import { RtlText } from '@verterbank/ui';

type TranslationsProps = {
  translations: ApiTranslation[];
};

export function Translations({ translations }: TranslationsProps): ReactElement {
  const translationsByLanguage = translations.reduce((acc: KeyValueItem[], translation) => {
    acc.push({
      label: <RtlText>{LanguagesEnum[translation.lang]}</RtlText>,
      value: <span>{translation.text}</span>,
    });
    return acc;
  }, []);

  return (
    <div className={styles.translationContainer}>
      <RtlText variant="h4">{yi.sections.translations}</RtlText>
      {translationsByLanguage && <KeyValueGrid items={translationsByLanguage} />}
    </div>
  );
}
