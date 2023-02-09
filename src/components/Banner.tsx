import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bannerImg from 'assets/images/background.png';
import styles from 'styles/Banner.module.css';

const Banner: React.FC = (props) => {
  console.log(props);

  return (
    <div className={styles.banner}>
      <div className={styles.subInfo}>
        <Link href={'/'}>
          <h1 className={styles.title}>The Rick and Morty Challenge</h1>
        </Link>
        <h2 className={styles.subTitle}>lorem ipsum dolor sit amet</h2>
        <button className={styles.button}>Subscribe</button>
      </div>
      <div className={styles.bannerImgWrapper}>
        <Image src={bannerImg} alt="Picture of the banner" className={styles.bannerImg} />
      </div>
    </div>
  );
};

export default Banner;
