// src/components/sections/AboutSection.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import { Users, Heart, Award, LifeBuoy, Calendar, Clock } from 'lucide-react';
import styles from '@/styles/about.module.css';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
};

const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  // Feature items data with enhanced descriptions
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: t('aboutPoint1'),
      description: 'Our volunteers provide guidance, assistance, and support to pilgrims and visitors from around the world, ensuring a meaningful and comfortable experience.',
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: t('aboutPoint2'),
      description: 'We cultivate a culture of giving, empathy, and social responsibility, encouraging members of the community to contribute their time and skills for a noble cause.',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: t('aboutPoint3'),
      description: 'Through comprehensive training programs and hands-on experience, our volunteers enhance their communication, leadership, and interpersonal abilities.',
    },
  ];
  
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutGrid}>
          {/* Image Side */}
          <div className={styles.aboutImageWrapper}>
            <img
              src="/images/about-image.jpg"
              alt="Volunteers serving at the Holy Mosque"
              className={styles.aboutImage}
            />
            
            {/* Decorative elements */}
            <div 
              className={styles.decorativeSquare1}
              aria-hidden="true"
            ></div>
            <div 
              className={styles.decorativeSquare2}
              aria-hidden="true"
            ></div>
          </div>
          
          {/* Content Side */}
          <div className={styles.aboutContent}>
            <h2>
              {t('aboutTitle')}
            </h2>
            
            <p className={styles.aboutDescription}>
              The Haramain Volunteers program unites passionate individuals dedicated to serving pilgrims and visitors at the Two Holy Mosques. We provide comprehensive training, meaningful opportunities, and a supportive community for those seeking to contribute to the sacred experience of millions.
            </p>
            
            {/* Statistics */}
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5,000+</span>
                <span className={styles.statLabel}>Active Volunteers</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>200+</span>
                <span className={styles.statLabel}>Opportunities</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Service Hours</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;