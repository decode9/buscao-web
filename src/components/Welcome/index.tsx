import styles from './styles.module.scss'
import Search from '../Search'
import { useState, useEffect } from 'react'

const Welcome = ({ section, title = '' }) => {
  const sourceUrl = section?.background?.sourceUrl
  const sourceUrlResponsive = section?.backgroundResponsive?.sourceUrl

  const [responsive, setResponsive] = useState('');
  const [path, setPath] = useState('');
  
  useEffect(() => {
    if(window.innerWidth <= 576) setResponsive('576');
    if(window.innerWidth >576 && window.innerWidth <= 768) setResponsive('768');
    if(window.innerWidth > 768) setResponsive('769');
    window.addEventListener('resize', checkWidth);

    setPath(window.location.pathname)
    return () => window.removeEventListener('resize', checkWidth);
  }, [responsive]);

  const checkWidth = () => {
    if(window.matchMedia('(max-width: 576px) and (min-width: 370px)').matches) return setResponsive('576');
    if(window.matchMedia('(max-width: 768px) and (min-width: 577px)').matches) return setResponsive('768');
    if(window.matchMedia('(min-width: 769px)').matches) return setResponsive('769');
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
          background-image: ${(path == '/commerces' && responsive <= '576') ? ''  : 
                              (path == '/commerces' && responsive > '576') ? `url(${sourceUrl})` :
                              `url(${responsive > '576' ? sourceUrl : sourceUrlResponsive})`};
          background-color: ${path == '/commerces' && responsive <= '576' ? '#1652F0' : ''};
          background-size: ${responsive <= '576' ? '100% 100%' : 'cover'};
          background-repeat: no-repeat;
          background-position: center;
          height: ${(path == '/commerces' && responsive <= '576') ? '30vh' : '80vh'};
          width: 100%;
        }

        ._keywordTitle {
          margin-bottom: ${(title.length > 15) ? '0%' : '14px'};
        }

        .container {
          height: ${(path == '/commerces' && responsive <= '576') ? '25vh'  : ''};
                  
      `}</style>
    </>
  )
}

export default Welcome
