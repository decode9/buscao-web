import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux'
import { filterPosts, setFilter } from '../../store/actions';
import { Checkbox, DropDown } from '../../../public/images/icons'
import styles from './styles.module.scss'

const Search = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [checkedOne, setCheckedOne]: any = useState(false)
  const [checkedTwo, setCheckedTwo]: any = useState(false)

  const { categories, currentStates } = useSelector(state => state.resource);
  const { filter } = useSelector(state => state.post);
  const [select, setSelect]: any = useState({ state: filter.state, category: filter.category, title: filter.title })

  const changeState = (event) => {
    dispatch(filterPosts(event.target.value, 'state'))
    setSelect({ ...select, ...{ state: event.target.value, category: '', title: '' } })
    dispatch(setFilter({ ...select, ...{ state: event.target.value, category: '', title: '' } }))
  }

  const checkStateOne = () => {
    setCheckedOne(!checkedOne)
  }
  const checkStateTwo = () => {
    setCheckedTwo(!checkedTwo)
  }

  const changeCategory = (event) => {
    dispatch(filterPosts(event.target.value, 'categories'))
    setSelect({ ...select, ...{ category: event.target.value, title: '' } })
    dispatch(setFilter({ ...select, ...{ category: event.target.value, title: '' } }))
  }

  const changeTitle = (event) => {
    const title = select.title
    dispatch(filterPosts(title, 'title'))
    dispatch(setFilter(select))

    if (title) redirectToResults()
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
            <label style={{ display: 'flex' }}>
              <label style={{ color: checkedOne ? '#1652F0' : '#93959A' }} htmlFor='state'>UBICACIÓN</label>
              <div className={styles._dropdown}> <DropDown color={checkedOne ? '#1652F0' : '#93959A'} /> </div>
            </label>
            <select name='state' value={select.state} onChange={changeState}>
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
          <label style={{ display: 'flex' }}>
            <label style={{ color: checkedTwo ? '#1652F0' : '#93959A' }} htmlFor='category'>CATEGORIAS</label>
            <div className={styles._dropdown}> <DropDown color={checkedTwo ? '#1652F0' : '#93959A'} /> </div>
          </label>
          <select name='category' value={select.category} onChange={changeCategory} >
            <option value=''>Todos</option>
            {categories.map((category, index) => (<option value={category.slug} key={index}>{category.name}</option>))}
          </select>
        </div>
      </div>
      <div className={styles._inputContainer}>
        <input placeholder='Que estás buscando' value={select.title} onChange={(event) => setSelect({ ...select, ...{ title: event.target.value } })} />
        <button className={styles._goButton} onClick={changeTitle}>Ir</button>
      </div>
    </div>
  )
}

export default Search;
