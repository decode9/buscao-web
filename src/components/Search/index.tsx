import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { filterPosts, setFilter } from '../../store/actions';
import { Checkbox, DropDown } from '../../../public/images/icons'
import styles from './styles.module.scss'

const Search = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { filter, countryPosts } = useSelector(state => state.post);

  useEffect(() => {
    return () => { if (router.route == '/commerces') changeState('') }
  }, [countryPosts])


  const [checkedOne, setCheckedOne]: any = useState(filter.checkedOne)
  const [checkedTwo, setCheckedTwo]: any = useState(filter.checkedTwo)

  const { categories, currentStates } = useSelector(state => state.resource);

  const [select, setSelect]: any = useState({ state: filter.state, category: filter.category, title: filter.title, checkedOne: checkedOne, checkedTwo: checkedTwo })

  const checkStateOne = () => {
    changeState('')
    setCheckedOne(!checkedOne)
  }
  const checkStateTwo = () => {
    changeCategory('')
    setCheckedTwo(!checkedTwo)
  }

  const changeState = (value) => {
    dispatch(filterPosts(value, 'state'))
    setSelect({ ...select, ...{ state: value, category: '', title: '' } })
    dispatch(setFilter({ ...select, ...{ state: value, category: '', title: '', checkedOne: checkedOne, checkedTwo: checkedTwo } }))
    if (value && router.route == '/') redirectToResults()
  }


  const changeTitle = () => {
    const title = select.title
    dispatch(filterPosts(title, 'title'))
    dispatch(setFilter(select))

    if (title) redirectToResults()
  }

  const changeCategory = (value) => {
    dispatch(filterPosts(value, 'categories'))
    setSelect({ ...select, ...{ category: value, title: '', checkedOne: checkedOne, checkedTwo: checkedTwo } })
    dispatch(setFilter({ ...select, ...{ category: value, title: '', checkedOne: checkedOne, checkedTwo: checkedTwo } }))
    if (value) redirectToResults()
  }



  const redirectToResults = () => {
    const pathname = router.pathname
    if (pathname == '/' || pathname == '/commerce') router.push('/commerces')
  }


  return (
    <div className={styles._searchContent}>
      {currentStates.length ? (
        <div className={styles._selectContainer}>
          <div className={styles._radioContainer} onClick={checkStateOne}>
            <Checkbox color={checkedOne ? '#1652F0' : '#93959A'} />
          </div>
          <div className={styles._select}>
            <label style={{ display: 'flex' }} htmlFor="state" className={checkedOne ? (router.pathname === '/commerce') ? styles._activeCommerce : styles._active : styles._inactive} >
              <label htmlFor='state'>UBICACIÓN</label>
              <div className={styles._dropdown}> <DropDown /> </div>
            </label>
            <select disabled={!checkedOne} name='state' value={select.state} onChange={event => changeState(event.target.value)}>
              <option value=''>Todos</option>
              {currentStates.map((state, index) => (<option value={state.slug} key={index}>{state.name}</option>))}
            </select>
          </div>
        </div>
      ) : null}
      <div className={styles._selectContainer}>
        <div className={styles._radioContainer} onClick={checkStateTwo}>
          <Checkbox color={checkedTwo ? '#1652F0' : '#93959A'} />
        </div>
        <div className={styles._select}>
          <label style={{ display: 'flex' }} htmlFor='category' className={checkedTwo ? (router.pathname === '/commerce') ? styles._activeCommerce : styles._active : styles._inactive}>
            <label htmlFor='category'>CATEGORIAS</label>
            <div className={styles._dropdown}> <DropDown /> </div>
          </label>
          <select disabled={!checkedTwo} name='category' value={select.category} onChange={event => changeCategory(event.target.value)} >
            <option value=''>Todos</option>
            {categories.map((category, index) => (<option value={category.slug} key={index}>{category.name}</option>))}
          </select>
        </div>
      </div>
      <div className={styles._inputContainer}>
        <input placeholder='Que estás buscando' value={select.title} onChange={(event) => setSelect({ ...select, ...{ title: event.target.value, checkedOne: checkedOne, checkedTwo: checkedTwo } })} />
        <button className={styles._goButton} onClick={changeTitle}>Ir</button>
      </div>
    </div>
  )
}

export default Search;
