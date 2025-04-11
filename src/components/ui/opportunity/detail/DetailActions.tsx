// src/components/ui/opportunity/detail/DetailActions.tsx
import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Info, Check } from 'lucide-react';
import styles from '@/styles/opportunity/detail.module.css';

interface DetailActionsProps {
  status: 'open' | 'closed' | 'filled';
  applicationDeadline: string;
  isLoggedIn?: boolean;
}

const DetailActions: React.FC<DetailActionsProps> = ({
  status,
  applicationDeadline,
  isLoggedIn = false, // Default to not logged in
}) => {
  const { t } = useLanguage();
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Format date to be more readable if it's in ISO format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  const handleApply = () => {
    if (!isLoggedIn) return;
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
    }, 1500);
  };
  
  const getButtonState = () => {
    if (status === 'closed' || status === 'filled') {
      return {
        disabled: true,
        text: status === 'closed' ? t('opportunityClosed') : t('opportunityFilled'),
        icon: <AlertTriangle className="h-4 w-4 mr-2" />
      };
    }
    
    if (isApplied) {
      return {
        disabled: true,
        text: t('applied'),
        icon: <Check className="h-4 w-4 mr-2" />
      };
    }
    
    if (!isLoggedIn) {
      return {
        disabled: true,
        text: t('signInToApply'),
        icon: <Info className="h-4 w-4 mr-2" />,
        showTooltip: true
      };
    }
    
    return {
      disabled: false,
      text: t('applyNow'),
      loading: isApplying
    };
  };
  
  const buttonState = getButtonState();
  
  return (
    <div className={styles.actions}>
      <div className={styles.deadlineContainer}>
        <Calendar className="h-5 w-5 text-neutral-500" />
        <span className={styles.deadlineText}>
          {t('applicationDeadline')}: <strong>{formatDate(applicationDeadline)}</strong>
        </span>
      </div>
      
      <div className={styles.actionButtons}>
        <div 
          className={styles.buttonWrapper}
          onMouseEnter={() => buttonState.showTooltip && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Button
            className={styles.applyButton}
            disabled={buttonState.disabled}
            onClick={handleApply}
          >
            {buttonState.loading ? (
              <>
                <span className={styles.spinner}></span>
                {t('applying')}
              </>
            ) : (
              <>
                {buttonState.icon}
                {buttonState.text}
              </>
            )}
          </Button>
          
          {showTooltip && (
            <div className={styles.tooltip}>
              {t('loginRequiredTooltip')}
            </div>
          )}
        </div>
        
        <Button variant="outline" className={styles.shareButton}>
          {t('share')}
        </Button>
      </div>
    </div>
  );
};

export default DetailActions;