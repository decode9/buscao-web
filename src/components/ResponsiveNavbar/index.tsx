import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Toggle } from '../../../public/images/icons';
import Link from 'next/link'
import { Location } from '../';
import { World } from '../../../public/images/icons';
import { scrolling } from '../../utils/common';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setScroll } from '../../store/actions';

const ResponsiveNavbar = ({ background, reference }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [show, setShow] = useState(0);
  const [currentClass, setCurrentClass] = useState(styles._static);

  const showMenu = () => {
    if (show == 0) return setShow(1);
    show == 1 ? setShow(2) : setShow(1);
  }

  useEffect(() => {
    if (show == 1) setCurrentClass(styles._menu);
    if (show == 2) setCurrentClass(styles._menuHidden);
  }, [show])

  // const goToAboutUs = () => {
  //   if(router.pathname == '/') {

  //     return;
  //   }
  // }

  const goToAboutUs = () => {
    if(router.pathname != '/') {
      dispatch(setScroll(true))
      router.push('/')
      return
    }

    scrolling(reference)
    showMenu()
  }

  return (
    <>
      <div className='_mainResponsive'>
        <div className={styles._child}>
          <div>
            <Link href='/'>
              <img src='images/logos/logo-responsive.svg' />
            </Link>
          </div>

          <div className={styles._rightSide}>

            <div className={styles._locationParent}>
              <Location />
              <div className={styles._worldParent}>
               <World color='#EFF4F6' />
              </div>
            </div>

            <div onClick={showMenu} className={styles._toggleParent}>
              <Toggle />
            </div>
          </div>

        </div>

        <div className={currentClass} >

          <div className={styles._contentParent}>
            <div className={styles._menuLinks}>

              <div className={styles._toggleMobile} onClick={showMenu}>
                <Toggle />
              </div>
              <div className={styles._links}>
                <Link href='/commerces'>
                  <p >Comercios</p>
                </Link>

                <hr className={styles._separator} />
                  <p onClick={goToAboutUs}>Nosotros</p>
                <hr className={styles._separator} />
              </div>

              <div className={styles._contact}>
                <p className={styles._bold}>CONTÁCTANOS</p>
                <p>info@buscao.com</p>
                <hr className={styles._separator} />
                <p className={styles._bold}>INSTAGRAM</p>
                <p>@buscao_</p>
                <hr className={styles._separator} />
                <p className={styles._bold}>TWITTER</p>
                <p>@buscao_</p>
                <hr className={styles._separator} />
              </div>

              <div className={styles._buttons}>
                <a href='https://cryptobuyer.io/es/' target='_blank' className={styles._tag}>
                  <button className={styles._whiteBtn} >Compra Criptos</button>
                </a>

                <a href='https://cryptobuyer.io/es/' target='_blank' className={styles._tag}>
                  <button className={styles._blueBtn}>Paga con Criptos</button>
                </a>
              </div>

              <div className={styles._footer}>
                <div className={styles._logosParent}>
                  <img src='images/logos/logo.svg' width="110px" />
                  <div>

                    <a href='https://www.thecodeworkers.com/' target='_blank'>
                      <img src='images/logos/tcw-logo.svg' width="20px" className={styles._tcwLogo} />
                    </a>

                    <img src='images/logos/banana-logo.svg' width="20px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
      ._mainResponsive {
        background-color: ${background};
        padding: 1.4rem 0px;
        display: flex;
        justify-content: center;
      }
    `}</style>
    </>
  )
};

export default ResponsiveNavbar;
