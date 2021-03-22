import { useState, useEffect } from 'react';
import { World, Toggle } from '../../../public/images/icons'
import styles from './styles.module.scss'
import Link from 'next/link';
import { ResposiveNavbar, Location } from '../../components';
import { setScroll } from '../../store/actions';
import { scrolling } from '../../utils/common';
import { useSelector, useDispatch} from 'react-redux';
import { useRouter } from 'next/router'

const Navbar = ({ background = '#1652F0', reference }: any) => {

  const router = useRouter()
  const dispatch = useDispatch()
  const { intermittence } = useSelector(state => state)
  const [responsive, setResponsive] = useState(false);

  const menuDeploy = () => setResponsive(!responsive);

  useEffect(() => {
    if(window.innerWidth < 768) setResponsive(true);
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) return setResponsive(true);
    setResponsive(false);
  };

  const navigateToAboutUs = () => {
    if(router.pathname != '/') {
      dispatch(setScroll(true))
      router.push('/')
      return
    }

    scrolling(reference)
  }


  return (
    <>
    {
      !responsive ?
      <div className='_main'>
      <div className={styles._container}>
        <div className={styles._leftSection} >
          <div className={styles._logo}>
            <Link href="/">
              <img src='images/logos/logo.svg' />
            </Link>
          </div>
          <div className={styles._links}>
            <Link href='/commerces'>
              <p className={styles._textLink}> Comercios </p>
            </Link>
            <p className={styles._textLink} onClick={navigateToAboutUs}> Nosotros </p>
          </div>
        </div>
        <div className={styles._rightSection} >
          <div className={styles._rightText}>
            <div className={styles._locationParent}>
               <Location />
            </div>

            <div>
              <World color='#EFF4F6' />
            </div>
          </div>

          <div className={styles._toggle} onClick={menuDeploy}>
            <Toggle />
          </div>
        </div>
      </div>
    </div> : <ResposiveNavbar background={background} reference={reference} />
    }

      <style jsx>{`
      ._main {
        background-color: ${background};
        padding: 1.4rem 0px;
      }
    `}</style>
    </>
  )
}

export default Navbar
