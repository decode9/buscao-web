import { useSelector } from 'react-redux';
import { Navbar, Search, Card, Currency } from '../components';
import { NextPage } from 'next';
import styles from '../../public/styles/Commerce.module.scss';
import { useEffect, useState } from 'react';
import { AMPM, paginate } from '../utils';
import Pagination from '../components/Pagination';
import { useDispatch } from 'react-redux';
import { setLoader } from '../store/actions';

const findDay = () => {
  const options = { weekday: 'long' };
  let date = new Date()
  let day_week = date.toLocaleDateString('en-US', options)
  let day_week_arr = day_week.split(',');
  let day = day_week_arr[0].toLowerCase();
  return day;
}

const perPage = 12
const day = findDay()


const commerce: NextPage = () => {

  const dispatch = useDispatch()
  const { post: { filterPosts }, selectedCommerce, resource } = useSelector(state => state)

  const [company, setCompany] = useState<any>(() => filterPosts.find(element => element['id'] == selectedCommerce.id));
  const [subsidiary, setSubsidiary] = useState<any>();
  const [index, setIndex] = useState(0);
  const [focus, setFocus] = useState(1);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const newCompany = filterPosts.find(element => element['id'] == selectedCommerce.id)
    setCompany(newCompany)
    var first_subsidiary = newCompany ? newCompany.commerce.subsidiary : [];
    setSubsidiary(first_subsidiary[0]);
    changeCompany(first_subsidiary[0], 0)
    dispatch(setLoader(false));
  }, [filterPosts]);

  const changeCompany = (node, element) => {
    setSubsidiary(node);
    setFocus(element);
    setIndex(element);
    var x = document.getElementById(element)
    var y = document.getElementById(focus.toString())
    x?.setAttribute('style', 'color: white; background-color: #1652F0;')
    if (element != focus) y?.removeAttribute('style')
  }

  return (
    <div>
      <main>
        <Navbar resource={resource} />
        <section className={styles._moreInfoContainer}>
          <div className={styles._leftInfo}>
            <div className={styles._cardContainer}>
              <Card
                content={company}
                phoneClass='_infoParentBlack'
                subsidiary={subsidiary ? subsidiary : ''}
                showClock={true}
                showAddress={false}
                id={index}
              />
            </div>
            <section>
              <Currency key={company ? company.id : []} currenciesData={company ? { currencies: company.commerce.paymentmethods } : []} />
            </section>
          </div>
          <div className={(company) ? styles._mapContainer : styles._hideMap}>
            {(company) ? '' : <div className={styles._hide}><p>No Disponible</p></div>}
            <iframe
              src={(subsidiary) ? `https://maps.google.com/maps?q=${subsidiary.map?.latitude},${subsidiary.map?.longitude}&z=15&output=embed` : ''}>
            </iframe>
          </div>
        </section>

        <section className={styles._searchContainer}>
          <Search />
        </section>

        {
          company ?
            <section className={styles._cardsContainer}>
              <div className={styles._cards}>
                {paginate(company.commerce.subsidiary, page, perPage).map((card, index) => {
                  return (
                    <button className={styles._cardContent} id={index.toString()} key={index} onClick={() => changeCompany(card, index)}>
                      <p className={styles._text}> {card.name}</p>
                      <p>{card.phoneNumber}</p>
                      {
                        card.schedule[day] ?
                          card.schedule[day].apertura ? <p>{AMPM(card.schedule[day].apertura)} / {AMPM(card.schedule[day].cierre)}</p> : <p>No Disponible</p>
                          : <p> - </p>
                      }
                    </button>
                  )
                })
                }
              </div>
              <div className={styles._paginationContainer}>
                {
                  company ? <Pagination color='white' activeColor='#1652F0' currentPage={page} items={company?.commerce.subsidiary} perPage={perPage} changePage={setPage} /> : ''
                }
              </div>
            </section> : (
              <section className={styles._cardsContainer}>
                <div className={styles._notFoundContainer}>
                  <div>
                    <p>¡Lo siento! No hay servicios que coincida con tu búsqueda.</p>
                    <p>Intente cambiar sus filtros de búsqueda</p>
                  </div>
                </div>
              </section>
            )
        }
      </main>
    </div>
  );
}

export default commerce
