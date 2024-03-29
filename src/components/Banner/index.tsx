import { memo, useRef } from 'react'
import styles from './styles.module.scss'

const Banner = ({ section }) => {

  const bannerRef = useRef();

  return (
    <>
      <div className="_container" ref={bannerRef}>
        <div className={styles._leftColumn}>
          <div className={styles._leftColumn__resize}>
            <div className={styles._imageContainer}>
              <img src="images/logos/buscao-big-logo.svg" alt="buscao" width="45%" />
            </div>
            <div className={styles._textContainer}>
              <div dangerouslySetInnerHTML={{ __html: section?.content }} className={styles._content} />
            </div>
          </div>
        </div>
      </div>

      <style jsx type="scss">{`

      ._container {
        background-image: url(${section?.background?.sourceUrl});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 42vw;
      }

      @media (max-width: 992px) {
        ._container {
          background-image: url(${section?.backgroundResponsive?.sourceUrl});
          width: 100%;
          background-size: cover;
          height: 100vh;
        }
      }
    `}</style>
    </>
  )
}

export default memo(Banner)
