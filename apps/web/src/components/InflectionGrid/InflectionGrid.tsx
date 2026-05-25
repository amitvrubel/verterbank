import type { AdjectiveInflections } from '../../utils/getAdjectiveInflections.ts';
import { Fragment, type ReactElement } from 'react';
import styles from './InflectionGrid.module.scss';
import { yi } from '../../i18n/messages.ts';
import { RtlText } from '../RtlText/RtlText.tsx';
import { caseLabel } from '../../enum/CaseEnum.ts';
import _ from 'classnames';
interface InflectionGridProps {
  inflections: AdjectiveInflections;
}

export function InflectionGrid({ inflections }: InflectionGridProps): ReactElement {
  return (
    <>
      <div className={styles.inflectionGrid}>
        <div className={_(styles.cell, styles.header)} />
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.masculine}</RtlText>
        </div>
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.feminine}</RtlText>
        </div>
        <div className={_(styles.cell, styles.header)}>
          <RtlText>{yi.neuter}</RtlText>
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
          <RtlText>{yi.plural}</RtlText>
          <RtlText>{inflections.plural}</RtlText>
        </div>
      )}
    </>
  );
}
