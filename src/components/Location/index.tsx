import { useDispatch, useSelector } from 'react-redux';
import { changeResources } from '../../store/actions';

const Location = ({color = '#EFF4F6'}) => {

  const { currentLocation, countries } = useSelector(state => state.resource)
  const dispatch = useDispatch()
  const changeCountry = (event) => dispatch(changeResources(event.target.value))

  return (
    <>
      {
        currentLocation ? (
          <select name="countries" className='_countriesSelect' defaultValue={currentLocation} onChange={changeCountry}>
            {
              countries.map((country, index) => {
                return <option value={country.slug} key={index}>{country.name}</option>
              })
            }
          </select>
        ) : null
      }

      <style jsx>{`
      ._countriesSelect {
        color: ${color};
        font-family: $helveticaNowText;
        background-color: transparent;
        border: none;
        font-size: 0.9rem;
        cursor: pointer;
      }

      ._countriesSelect option {
        color: #353535;
      }
    `}</style>
    </>
  )
};

export default Location;
