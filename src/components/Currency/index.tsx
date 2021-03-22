import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

const Currency = ({ children = null, currenciesData = null }) => {

  const { currencies } = (currenciesData && currenciesData.currencies?.length) ? currenciesData : useSelector(state => state.resource);

  return (
    <div className={styles._currenciesContent}>
      <div className={(children) ? styles._currenciesCard : styles._currenciesCard + ' ' + styles._visible}>
        {(currencies) ? currencies.map((currency, index) => (
          <div key={index} className={(children) ? styles._tooltip : styles._coinBox}>
            <img src={currency.currencyData.icon.mediaItemUrl} width='30px' height='30px' />
            {(children) ? <div className={styles._tooltiptext}>{currency.name}</div> : <p>{currency.name}</p>}
          </div>
        )) : null}
      </div>
      {(children) ? children : null}
    </div>
  )
}

export default Currency;
