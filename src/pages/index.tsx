import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { wrapper } from '../store'
import { getResources, setLoader } from '../store/actions'
import { Navbar, Footer, Slider, Banner, FeaturedSlider, Welcome, Currency3D, Loader} from '../components'
import styles from '../../public/styles/Home.module.scss'
import { setScroll } from '../store/actions';
import { scrolling } from '../utils'
import Head from 'next/head'

const Home = () => {
  const banner = useRef()
  const dispatch = useDispatch()
  const { intermittence } = useSelector(state => state)

  const {
    page: { homePage: { home } },
    resource,
    post
  } = useSelector(state => state)

  useEffect( () => {
    if(intermittence.scroll) scrolling(banner);

    return () => {  dispatch(setScroll(false)) }
  }, [])

  return (
    <div className={styles._container}>
      <Head>
        <title>Buscao</title>
      </Head>

      <Navbar resource={resource} reference={banner}/>
      <Loader />
      <Welcome section={home?.principalBanner}/>
      <Currency3D />
      <FeaturedSlider posts={post?.outstandingPosts} />
      <div ref={banner}>
       <Banner section={home?.secundaryBanner} />
      </div>
      <Slider page={home} />
      <Footer />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  ({ store }) => store.dispatch(getResources())
)

export default Home
