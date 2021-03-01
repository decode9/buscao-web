import styles from './styles.module.scss'
import { useState } from 'react';
const Currency3D = () => {

  const [reference, setReference]: any = useState('0px')
  const [currentId, setcurrentId]: any = useState(null)
  const [coin, setCoin]: any = useState({ one: '_coinStaticOne', two: '_coinStaticOne', three: '_coinStaticOne', four: '_coinStaticOne' })
  const coins = [
    {
      id: 'btc',
      source: '../../images/lying-coins/lying-btc.svg',
      class: '_coin1',
      enter: (index) => mouseEnter('one'),
      out: () => mouseOut('btc', 'one'),
      animation: coin.one
    },

    {
      id: 'ltc',
      source: '../../images/lying-coins/lying-lite.svg',
      class: '_coin2',
      enter: (index) => mouseEnter('two'),
      out: () => mouseOut('ltc', 'two'),
      animation: coin.two
    },
    {
      id: 'eth',
      source: '../../images/lying-coins/lying-ether.svg',
      class: '_coin3',
      enter: (index) => mouseEnter('three'),
      out: () => mouseOut('eth', 'three'),
      animation: coin.three
    },
    {
      id: 'xpt',
      source: '../../images/lying-coins/lying-xpt.svg',
      class: '_coin4',
      enter: (index) => mouseEnter('four'),
      out: () => mouseOut('xpt', 'four'),
      animation: coin.four
    }
  ]

  const mouseEnter = (number) => setCoin({ ...coin, [number]: '_coinPositionOne' })

  const mouseOut = (id, number) => {
    setcurrentId(id);
    const referenceCoin = document.getElementById(id);
    const getCoinPosition = new DOMMatrix(window.getComputedStyle(referenceCoin).transform);
    const coinPosition = getCoinPosition.m42;
    setReference(`${coinPosition}px`);
    setCoin({ ...coin, [number]: `_coinPositionTwo${id}` })
  }

  return (
    <>
      <div className={styles._container}>
        <div className={styles._coins}>
          {
            coins.map((res, index) => {
              return (
                <div key={index} className={styles[res.class]}>
                  <img id={res.id} className={res.animation} onMouseOver={() => res.enter(index)} onMouseOut={() => res.out()} src={res.source}></img>
                </div>
              )
            })
          }
        </div>
      </div>

      <style jsx>{`
      ._coinStaticOne {
        transform: translateY(0px)
      }
      ._coinPositionOne{
        animation: MoveUpDownCoins 1s alternate infinite
      }
      ._coinPositionTwo${currentId}{
        animation: DownCoins 1s
      }
      @keyframes MoveUpDownCoins {
        from { transform: translateY(0px)}
        to { transform:translateY(-20px)}
      }
      @keyframes DownCoins {
        from { transform: translateY(${reference})}
        to { transform:translateY(0px)}
      }
    `}</style>
    </>
  )
}
export default Currency3D
