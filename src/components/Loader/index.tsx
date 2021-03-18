import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

let interval;

const Loader = () => {

  const { loader: { show } } = useSelector(state => state);
  const [currentSquare, setCurrentSquare] = useState(0);

  useEffect(() => {
    changeClass();
    return () => clearTimeout(interval)
  }, [currentSquare])

  const changeClass = () => {
    interval = setTimeout(() => {
      if (currentSquare <= 2) return setCurrentSquare(currentSquare + 1);
      if(currentSquare == 3) setCurrentSquare(0)
    }, 1000);
  }

  const currentClass = (param) => {
    if(param == currentSquare) return '_square';
    return '_squareOut';
  }

  return (
    <>
      <div className={show ? styles._main : styles._hide}>
        <div>
          <div className={styles._squareParent}>
            <div className={currentClass(0)} />
            <div className={currentClass(1)} />
            <div className={currentClass(2)} />
          </div>
        </div>
      </div>

      <style jsx>{`
      ._square {
        width: 1.2rem;
        height: 1.2rem;
        background-color: #FFF;
        margin: 0.7rem;
        animation: fadeIn 0.4s forwards;
      }

      ._squareOut {
        width: 1.2rem;
        height: 1.2rem;
        background-color: #FFF;
        margin: 0.7rem;
        animation: fadeOut 0.4s forwards;
      }

      @keyframes fadeIn {
        from {
          transform: translateY(0px);
          opacity: 0;
        }

        to {
          transform: translateY(-15px);
          opacity: 1;
        }
      }

      @keyframes fadeOut {
        from {
          transform: translateY(-15px);
          opacity: 1;
        }

        to {
          transform: translateY(0px);
          opacity: 0;
        }
      }
    `}</style>
    </>
  )

}

export default Loader;
