// src/components/layout/Footer.tsx
import React from 'react';
import { useLanguage } from '@/context/language-context';
import Link from 'next/link';
import { Heart, Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import styles from '@/styles/footer.module.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  // Footer quick links
  const quickLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/#about' },
    { name: t('opportunities'), path: '/#opportunities' },
    { name: t('contact'), path: '/#contact' },
  ];
  
  // Resources links
  const resourceLinks = [
    { name: t('footerTerms'), path: '/terms' },
    { name: t('footerPrivacy'), path: '/privacy' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' },
  ];
  
  // Social media links
  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="h-5 w-5" />, 
      path: 'https://facebook.com' 
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="h-5 w-5" />, 
      path: 'https://twitter.com' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="h-5 w-5" />, 
      path: 'https://instagram.com' 
    },
  ];
  
  return (
    <footer className={styles.footer}>
      {/* Decorative pattern at top of footer */}
      <div className={styles.footerPattern} aria-hidden="true"></div>
      
      <div className={styles.footerContainer}>
        {/* Footer top section with columns */}
        <div className={styles.footerTop}>
          {/* Column 1: Logo and description */}
          <div className={styles.footerColumn}>
            <Link href="/" className={styles.footerLogo}>
              <img
                src="/images/logo.png"
                alt={t('siteName')}
                className={styles.footerLogoImage}
              />
              <span className={styles.footerLogoText}>
                {t('siteName')}
              </span>
            </Link>
            <p className={styles.footerDescription}>
              Empowering volunteers to serve the guests of Allah at the Two Holy Mosques with excellence, dedication, and compassion.
            </p>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Makkah & Madinah, Saudi Arabia</span>
            </div>
          </div>
          
          {/* Column 2: Links */}
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={styles.footerLink}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={styles.footerLink}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Social media */}
          <div className={styles.footerColumn}>
            <h3>{t('contact')}</h3>
            <ul className={styles.footerSocial}>
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <div className={styles.socialIcon}>
                      {link.icon}
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:contact@haramainvolunteers.org" className={styles.socialLink}>
                  <div className={styles.socialIcon}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>contact@haramainvolunteers.org</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            &copy; {currentYear} {t('siteName')}. {t('footerRights')}
          </div>
          <div className={styles.footerInspiration}>
            <span>{t('siteName')}</span>
            <Heart className={`h-4 w-4 ${styles.heartIcon}`} />
            <span>Serving the Guests of Allah</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;