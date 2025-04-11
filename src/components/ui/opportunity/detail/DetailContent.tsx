// src/components/ui/opportunity/detail/DetailContent.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Clock, ListChecks, Lightbulb, Mail, User } from 'lucide-react';
import styles from '@/styles/opportunity/detail.module.css';

interface DetailContentProps {
  description: string;
  longDescription: string;
  requirements: string[];
  skills: string[];
  timeCommitment: string;
  contactPerson?: string;
  contactEmail?: string;
}

const DetailContent: React.FC<DetailContentProps> = ({
  description,
  longDescription,
  requirements,
  skills,
  timeCommitment,
  contactPerson,
  contactEmail,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.content}>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('opportunityDescription')}</h2>
        <p className={styles.description}>{description}</p>
        {longDescription.split('\n\n').map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph.trim()}
          </p>
        ))}
      </section>
      
      <div className={styles.twoColumnGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <ListChecks className="h-5 w-5 mr-2" />
            {t('requirements')}
          </h2>
          <ul className={styles.list}>
            {requirements.map((requirement, index) => (
              <li key={index} className={styles.listItem}>{requirement}</li>
            ))}
          </ul>
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Lightbulb className="h-5 w-5 mr-2" />
            {t('skillsDeveloped')}
          </h2>
          <ul className={styles.list}>
            {skills.map((skill, index) => (
              <li key={index} className={styles.listItem}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>
      
      <div className={styles.twoColumnGrid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Clock className="h-5 w-5 mr-2" />
            {t('timeCommitment')}
          </h2>
          <p className={styles.infoText}>{timeCommitment}</p>
        </section>
        
        {(contactPerson || contactEmail) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <User className="h-5 w-5 mr-2" />
              {t('contact')}
            </h2>
            {contactPerson && <p className={styles.infoText}>{contactPerson}</p>}
            {contactEmail && (
              <p className={styles.infoText}>
                <Mail className="h-4 w-4 inline-block mr-2" />
                <a href={`mailto:${contactEmail}`} className={styles.emailLink}>
                  {contactEmail}
                </a>
              </p>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default DetailContent;