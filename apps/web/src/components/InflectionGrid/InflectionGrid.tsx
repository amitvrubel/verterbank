import type { AdjectiveInflections } from '../../utils/getAdjectiveInflections.ts';
import { Fragment, type ReactElement } from 'react';
import styles from './InflectionGrid.module.scss';

import _ from 'classnames';
import { yi } from '@verterbank/messages';
import { caseLabel, RtlText } from '@verterbank/ui';
interface InflectionGridProps {
  inflections: AdjectiveInflections;
}

export function InflectionGrid({ inflections }: InflectionGridProps): ReactElement {
  return (
    <>
      <div className={styles.inflectionGrid}>
        <div className={_(styles.cell, styles.header)} />
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.grammar.masculine}</RtlText>
        </div>
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.grammar.feminine}</RtlText>
        </div>
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.grammar.neuter}</RtlText>
        </div>
        {inflections.rows.map((row) => (
          <Fragment key={row.case}>
            <div className={_(styles.cell, styles.rowLabel)}>
              <RtlText>{caseLabel[row.case]}</RtlText>
            </div>
            <div className={styles.cell}>
              <RtlText>{row.masculine ?? '—'}</RtlText>
            </div>
            <div className={styles.cell}>
              <RtlText>{row.feminine ?? '—'}</RtlText>
            </div>
            <div className={styles.cell}>
              <RtlText>{row.neuter ?? '—'}</RtlText>
            </div>
          </Fragment>
        ))}
      </div>
      {inflections.plural && (
        <div className={styles.pluralRow}>
          <RtlText>{yi.grammar.plural}</RtlText>
          <RtlText>{inflections.plural}</RtlText>
        </div>
      )}
    </>
  );
}
