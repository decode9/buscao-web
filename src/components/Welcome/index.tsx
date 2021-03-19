import styles from './styles.module.scss'
import Search from '../Search'
import { useState, useEffect } from 'react'

const Welcome = ({ section, title = '' }) => {
  const sourceUrl = section?.background?.sourceUrl
  const sourceUrlResponsive = section?.backgroundResponsive?.sourceUrl

  const [responsive, setResponsive] = useState(false);
  const [path, setPath] = useState('');
  
  useEffect(() => {
    if(window.innerWidth < 576) setResponsive(true);
    window.addEventListener('resize', checkWidth);

    setPath(window.location.pathname)
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 576px)');
    if (mediaQuery.matches) return setResponsive(true);
    setResponsive(false);
  };

  return (
    <>
      <div className={"_main"}>
        <div className={[styles._container, 'container'].join(" ")}>
          <div className={styles._centerContainer}>
            <div className={styles._titleContainer}>
              <p className={styles._title}>{section?.title}</p>
            </div>
            <div className={styles._descriptionContainer}>
              <p className={styles._description}>{section?.subtitle}</p>
            </div>
          </div>
        </div>
        <div className={styles._searchBuild}>
          <div>
            <div>
              <Search />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles._blackfloor}>
          {
            title ? (
              <div className={styles._content}>
                <div className={styles._yourResultContainer}>
                  <p>Tus resultados: </p>
                  <div></div>
                </div>
                <div className={styles._keywordContainer}>
                  <p className='_keywordTitle'>{title}</p>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

      <style jsx>{`
        ._main {
          background-image: ${(path == '/commerces' && responsive) ? ''  : 
                              (path == '/commerces' && !responsive) ? `url(${sourceUrl})` :
                              `url(${responsive ? sourceUrlResponsive : sourceUrl})`};
          background-color: ${path == '/commerces' && responsive ? '#1652F0' : ''};
          background-size: ${responsive ? '100% 100%' : 'cover'};
          background-repeat: no-repeat;
          background-position: center;
          height: ${(path == '/commerces' && responsive) ? '30vh' : '80vh'};
          width: 100%;
        }

        ._keywordTitle {
          margin-bottom: ${(responsive && title.length > 15) ? '0%' : '14px'};
        }

        .container {
          height: ${(path == '/commerces' && responsive) ? '25vh'  : 
                  (path == '/commerces' && !responsive) ? '' : ''};
      `}</style>
    </>
  )
}

export default Welcome
