import React from 'react';
import Image from 'next/image';
import bannerImg from 'assets/images/background.png';
import styles from 'styles/Banner.module.css';

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <Image src={bannerImg} alt="Picture of the banner" className={styles.bannerImg} />
    </div>
  );
};

export default Banner;
