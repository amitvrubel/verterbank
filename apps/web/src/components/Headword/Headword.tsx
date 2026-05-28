import { type ReactElement, useState } from 'react';
import { LexemeTabs } from '../LexemeTabs/LexemeTabs.tsx';
import { Lexeme } from '../Lexeme/Lexeme.tsx';
import styles from './Headword.module.scss';
import { useParams } from 'react-router-dom';
import { Search } from '../Search/Search.tsx';
import { Logo } from '../Logo/Logo.tsx';
import { useGetHeadwordById } from '../../hooks/useGetHeadwordById.ts';
import { Loading } from '../Loading/Loading.tsx';
import { RtlText } from '../RtlText/RtlText.tsx';

export function Headword(): ReactElement {
  const [activeLexemeIndex, setActiveLexemeIndex] = useState<number>(0);
  const { id } = useParams<{ id: string }>();
  const { data: headword, isLoading, error } = useGetHeadwordById(id);
  const lexeme = headword?.lexemes[activeLexemeIndex];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  if (!headword) {
    return <div>Could not find Headword</div>;
  }

  return (
    <div className={styles.headwordContainer}>
      <div className={styles.headwordHeader}>
        <Logo small />
        <Search variant="inline" />
      </div>
      <RtlText variant="h1" className={styles.headwordOrth}>
        {headword.orth}
      </RtlText>
      <LexemeTabs
        activeIndex={activeLexemeIndex}
        lexemes={headword.lexemes}
        onChange={setActiveLexemeIndex}
      />
      {lexeme && <Lexeme lexeme={lexeme} headwordOrth={headword.orth} />}
    </div>
  );
}
