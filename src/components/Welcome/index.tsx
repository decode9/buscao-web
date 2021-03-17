import styles from './styles.module.scss'
import Search from '../Search'
import { useState, useEffect } from 'react'

const Welcome = ({ section, title = '' }) => {
  const sourceUrl = section?.background?.sourceUrl
  const sourceUrlResponsive = section?.backgroundResponsive?.sourceUrl

  const [responsive, setResponsive] = useState(false);
  
  useEffect(() => {
    if(window.innerWidth < 576) setResponsive(true);
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', () => {});
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 576px)');
    if (mediaQuery.matches) return setResponsive(true);
    setResponsive(false);
  };

  return (
    <>
      <div className={"_main"}>
        <div className={styles._container}>
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
                  <p>{title}</p>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>

      <style jsx>{`
        ._main {
          background-image: url(${responsive ? sourceUrlResponsive : sourceUrl});
          background-size: ${responsive ? '100% 100%' : 'cover'};
          background-repeat: no-repeat;
          background-position: center;
          height: 80vh;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Welcome
