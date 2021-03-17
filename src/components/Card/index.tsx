import { FC, memo, useEffect, useState } from 'react'
import { Location, Clock } from '../../../public/images/icons'
import { CardProps } from './type'
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedCommerce, setLoader } from '../../store/actions';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const processHour = (time) => {
  let newHour

  if (time) {
    newHour = time.split(':')[0]
    return parseInt(newHour)
  }
}

const processMinutes = (time) => {
  let newMinutes

  if (time) {
    newMinutes = time.split(':')[1]
    return Number(newMinutes)
  }
}

const Card: FC<CardProps> = ({ content, phoneClass, subsidiary, showClock = true, showAddress = true, id }) => {
  const [status, setStatus] = useState(false)
  const [path, setPath] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const redirect = () => {
    let path = window.location.pathname
    if(path != '/commerce') {
      const id = content.id;
      dispatch(setLoader(true));
      dispatch(setSelectedCommerce(id));
      router.push('/commerce');
    }
  }

  useEffect(() => {
    const checkSchedule = () => {
      const day = new Date().getDay()
      const actualDay = days[day]
      const hourClose = content?.commerce?.subsidiary[0]?.schedule[actualDay]?.cierre
      const hourClosed = processHour(hourClose)
      const minutesClosed = processMinutes(hourClose)
      const currentHour = new Date().getHours()
      const currentMinutes = new Date().getMinutes()

      if (minutesClosed == 0) {
        if (hourClosed < currentHour) return false
        if (hourClosed == currentHour) return true
      }

      if (minutesClosed > 0) {
        if (currentMinutes > minutesClosed && hourClosed <= currentHour) return false
      }

      return checkOpen(currentHour, currentMinutes, actualDay) ? true : false
    }

    const checkOpen = (currentHour, currentMinutes, actualDay) => {
      const openHour = content?.commerce?.subsidiary[0]?.schedule[actualDay]?.apertura
      const hourOpen = processHour(openHour)
      const minutesOpen = processMinutes(openHour)

      if (minutesOpen == 0) {
        if (hourOpen > currentHour) return false
        if (hourOpen == currentHour) return true
      }

      if (minutesOpen > 0) {
        if (currentMinutes < minutesOpen && hourOpen <= currentHour) return false
      }

      return true;
    }

    if (showClock) setStatus(checkSchedule())

    setPath(window.location.pathname) 
  }, [])

  return (
    <div className={path != '/commerce' ? styles._commerces : styles._commerce}>
      <div className={styles._card} onClick={redirect}>
        <div className={styles._imageParent}>
          <img src={(content) ? content?.commerce?.image : 'images/logos/buscao-big-logo.svg'} width='40%' height='100%'></img>
        </div>

        <div className={styles._minicard}>
          <div>
            <span className={styles._title}> {content?.title || 'No Disponible'} </span><br />
            <span className={styles._text}> {content?.commerce?.description || 'Categoria'} </span>
          </div>

          {
            showClock ? (
              <div className={styles._rightText}>
                <p className={status ? styles._statusText : styles._closedText}> {status ? 'ABIERTO' : 'CERRADO '} </p>
                <Clock color={status ? '#4A973C' : '#EC3333'} />
              </div>
            ) : ''
          }
        </div>
      </div>

      <div className={styles[phoneClass]}>

        {
          subsidiary ? (
            <div className={styles._longAddress}>
              <p> {subsidiary.address} </p>
            </div>
          ) : ''
        }

        {
          content ?
          <a className={styles._call} href={(subsidiary) ? `tel:${(subsidiary.phoneNumber).replace(/\s/g, '')}` : `tel:${(content?.commerce?.subsidiary[0]?.phoneNumber).replace(/\s/g, '')}`} target='_blank'>
            <div id={(subsidiary) ? subsidiary.phoneNumber : content?.commerce?.subsidiary[0]?.phoneNumber} ></div>
          </a> :
          <a className={styles._call} href="#">
            <div id="-"></div>
          </a>
        }

        {
          showAddress ? (
            <div className={styles._location}>
              <p> {content?.commerce.subsidiary ? content?.commerce?.subsidiary[0]?.address : ''} </p>
              <Location color='#828282' />
            </div>
          ) : ''
        }
      </div>
    </div>
  )
};

export default memo(Card)
