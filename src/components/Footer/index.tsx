import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import { ResponsiveFooter, ResposiveNavbar } from '../../components';

const Footer = () => {

  const [responsive, setResponsive] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setResponsive(true);
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) return setResponsive(true);
    setResponsive(false);
  };

  return (
    <>
      {
        !responsive ?
          <footer className={styles._general}>
            <div className={styles._content}>
              <div className={styles._buttons}>
                <a href='https://cryptobuyer.io/es/' target='_blank' className={styles._tag}>
                  <button className={styles._whiteBtn} >Compra Criptos</button>
                </a>

                <a href='https://pay.cryptobuyer.io/accounts/signup/' target='_blank' className={styles._tag}>
                  <button className={styles._blueBtn}>Solicita Tu Punto de Venta</button>
                </a>
              </div>

              <div className={styles._socialMedia}>
                <div className={styles._link}>
                  <p className={styles._title}>INSTAGRAM</p>
                  <p className={styles._text}>@buscao_</p>
                </div>

                <div className={styles._linkTwo}>
                  <p className={styles._title}>TWITTER</p>
                  <p className={styles._text}>@buscao_</p>
                </div>

                <div className={styles._linkThree}>
                  <p className={styles._title}>CONTÁCTANOS</p>
                  <p className={styles._text}>info@buscao.com</p>
                </div>
              </div>

              <div className={styles._logos}>
                <div className={styles._logo}>
                  <a href='https://www.thecodeworkers.com' target='_blank'>
                    <img src='images/logos/tcw-logo.svg' />
                  </a>
                </div>

                <div>
                  <img src='images/logos/banana-logo.svg' />
                </div>
              </div>
            </div>
          </footer>
          : <ResponsiveFooter />
      }
    </>
  )
}

export default Footer;
