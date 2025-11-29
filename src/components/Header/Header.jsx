import React from 'react';
import styles from './Header.module.css';

/**
 * Reusable Header component that displays the EY logo and product name
 * This component will be used across multiple pages in the application
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <img 
            src={`${process.env.PUBLIC_URL}/assets/ey-logo.svg`}
            alt="EY Logo"
            className={styles.logo}
          />
          <span className={styles.productName}>CEC | BCM</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
