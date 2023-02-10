import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AppState } from 'store/store';
import bannerImg from 'assets/images/background.png';
import styles from 'styles/Banner.module.css';

const Banner: React.FC = (props) => {
  const router = useRouter();
  console.log(router);

  const type = router.pathname.split('/')[1];
  // @ts-ignore
  const { currentElement } = useSelector((state: AppState) => state[type] || {});
  const isHome = type === '';
  const title = isHome ? 'The Rick and Morty Challenge' : currentElement?.name;

  return (
    <div
      className={isHome ? styles.bannerHome : styles.banner}
      style={{
        backgroundImage: `url(${bannerImg.src})`,
        height: isHome ? '60vh' : '30vh'
      }}>
      <div className={styles.subInfo}>
        <Link href={'/'}>
          <h1 className={styles.title}>{title}</h1>
        </Link>
        {isHome && (
          <>
            <h2 className={styles.subTitle}>lorem ipsum dolor sit amet</h2>
            <button className={styles.button}>Subscribe</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
