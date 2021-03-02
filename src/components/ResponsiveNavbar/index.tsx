import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { Toggle } from '../../../public/images/icons';
import Link from 'next/link';

const ResponsiveNavbar = ({ background }) => {

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

  return (
    <>
      <div className='_mainResponsive'>
        <div className={styles._child}>
          <div>
            <img src='images/logos/logo.svg' />
          </div>

          <div onClick={showMenu} className={styles._toggleParent}>
            <Toggle />
          </div>
        </div>

        <div className={currentClass} >
          <ul className={styles._list}>
            <Link href="/commerces">
              <li>Comercios</li>
            </Link>

            <li>Nosotros</li>

            <li>
              <a href='https://cryptobuyer.io' target='_blank'>
                <button className={styles._btnLink} > Cryptobuyer.io </button>
              </a>
            </li>
          </ul>
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
