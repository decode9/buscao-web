import { useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';

const steps = [
  { number: 0 },
  { number: 1 },
  { number: 2 },
];

const Slider = ({ page }) => {

  const imagesLength = page?.slideshow.length;
  const [currentImage, setCurrentImage] = useState(0);
  const [up, setUp] = useState(true);
  const [responsive, setResponsive] = useState(false);
  const [sliderWidth, setSliderWidth] = useState('0%')

  const parent = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) setResponsive(true);
    window.addEventListener('resize', checkWidth);
    calculateWidth()

    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const checkWidth = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) return setResponsive(true);
    setResponsive(false);
  };

  useEffect(() => {
    sliding(currentImage);
    if (currentImage == 2) setUp(false);
    if (currentImage == 1 && !up) setUp(true);
  }, [currentImage]);

  useEffect(() => {
    const container = parent.current;
    container.addEventListener('wheel', handlerTrackpad, { passive: false });
    return () => container.removeEventListener('wheel', handlerTrackpad);
  }, []);

  const handlerTrackpad = (event: any) => {
    if(event.wheelDeltaX != 0) event.preventDefault();
  }

  const sliding = (value) => {
    const getElement = document.getElementById(page?.slideshow[currentImage].image.id);
    let offset = getElement.getBoundingClientRect()?.left;
    let offsetString = offset?.toString();

    if (offsetString?.includes('-')) {
      const newOffset = offsetString?.replace('-', '');
      offset = Number(newOffset);
    }

    if (value == 2) offset = offset += offset;
    if (value == 1) offset = offset;

    parent.current.scrollTo({
      left: value == 0 ? 0 : offset,
      behavior: 'smooth'
    });
  }

  const slide = (page) => setCurrentImage(page);

  const checkStep = (step) => {
    if (currentImage == step) return styles._currentCircle;
    return styles._circle;
  }

  const calculateWidth = () => {
    const length = page?.slideshow.length;

    if (length <= 3) {
      const widthPercent = `${length}00%`
      setSliderWidth(widthPercent);
      return;
    }

    setSliderWidth('300%');
  }

  return (
    <>
      <div className={styles._parent}>
        <div className={styles._sliderParent} ref={parent} >
          <div className='_sliderChild'>
            {
              page?.slideshow.slice(0, imagesLength <= 3 ? imagesLength : 3).map((item, index) => {
                return (
                  <div className={styles._container} key={index} id={item?.image?.id} >
                    <div style={{ backgroundImage: `url(${!responsive ? item.image.sourceUrl : item.imageResponsive.sourceUrl})` }} className={styles._divImage} />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={styles._stepper}>
          <div className={styles._steps}>
            {
              steps.slice(0, imagesLength <= 3 ? imagesLength : 3).map((res, index) => {
                return <div className={checkStep(res.number)} onClick={() => slide(res.number)} key={index}></div>
              })
            }
          </div>
        </div>
      </div>

      <style jsx>{`
      ._sliderChild {
        width: ${sliderWidth};
        display: flex;
      }
    `}</style>
    </>
  )
};

export default Slider;
