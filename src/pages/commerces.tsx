import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Result, Navbar, Welcome } from '../components'
import styles from '../../public/styles/Commerces.module.scss'
import Head from 'next/head'
import { Loader } from '../components';

const Commerces = () => {
  const {
    resource,
    post: { filterPosts, filter: { title } },
    page: { homePage: { home } }
  } = useSelector(state => state)

  const resultRef: any = useRef()

  useEffect(() => {
    const scrollToResults = () => {
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    scrollToResults()
  }, [])
  console.log()
  return (
    <>
      <Head>
        <title>Comercios</title>
      </Head>
      <Navbar resource={resource} />
      <Welcome section={home?.principalBanner} title={title} />
      <div className={styles._resultsContainer}>
        {
          filterPosts.length ? (
            <Result posts={filterPosts} />
          ) : (
            <div className={styles._notFoundContainer}>
              <div>
                <p>¡Lo siento! No hay servicios que coincida con tu búsqueda.</p>
                <p>Intente cambiar sus filtros de búsqueda</p>
              </div>
            </div>
          )
        }
      </div>
      <div ref={resultRef}></div>
    </>
  )
}

export default Commerces
