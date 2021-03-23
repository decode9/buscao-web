import styles from './styles.module.scss';


const ResponsiveFooter = () => (

  <footer className={styles._general}>
    <div className={styles._content}>
      <div className={styles._buslogo}>
        <img src='images/logos/logo.svg' />
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

)

export default ResponsiveFooter;
