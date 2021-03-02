import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { changeResources } from '../../store/actions'
import { World, Toggle } from '../../../public/images/icons'
import styles from './styles.module.scss'
import Link from 'next/link'
import { ResposiveNavbar } from '../../components';

const Navbar = ({ background = '#1652F0', resource }: any) => {

  const { currentLocation, countries } = resource
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  const changeCountry = (event) => dispatch(changeResources(event.target.value))

  const menuDeploy = () => {
    setShow(!show);
  };

  useEffect(() => {
    if(window.innerWidth < 768) setShow(true)
    window.addEventListener('resize', checkWidth);
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) return setShow(true);
    setShow(false);
  };

  return (
    <>
    {
      !show ?
      <div className='_main'>
      <div className={styles._container}>
        <div className={styles._leftSection} >
          <div className={styles._logo}>
            <Link href="/">
              <img src='images/logos/logo.svg' />
            </Link>
          </div>
          <div className={!show ? styles._links : styles._linksShow}>
            <Link href="/commerces">
              <p className={styles._textLink}> Comercios </p>
            </Link>
            <p className={styles._textLink}> Nosotros </p>
            <div className={styles._btnParent}>
              <a href='https://cryptobuyer.io' target='_blank'>
                <button className={styles._btnLink} > Cryptobuyer.io </button>
              </a>
            </div>
          </div>
        </div>
        <div className={styles._rightSection} >
          <div className={styles._rightText}>
            {
              currentLocation ? (
                <select name="countries" className={styles._countriesSelect} defaultValue={currentLocation} onChange={changeCountry}>
                  {
                    countries.map((country, index) => {
                      return <option value={country.slug} key={index}>{country.name}</option>
                    })
                  }
                </select>
              ) : null
            }
            <div>
              <World color='#EFF4F6' />
            </div>
          </div>

          <div className={styles._toggle} onClick={menuDeploy}>
            <Toggle />
          </div>
        </div>
      </div>
    </div> : <ResposiveNavbar background={background} />
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
