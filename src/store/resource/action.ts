import { CHANGE_RESOURCES, GET_RESOURCES, } from './action-types'
import { actionObject, Filter } from '../../utils'
import { GET_HOME_PAGE } from '../page/action-types'
import { resources } from '../../graphql/querys'
import axios from 'axios'
import { UPDATE_POSTS } from '../post/action_types'
import { SHOW_LOADER } from '../loader/action-types'

export const getResources: any = () => async dispatch => {
  const allResources = await resources()

  dispatch(actionObject(GET_HOME_PAGE, { homePage: allResources.homePage }))
  delete allResources['homePage']

  const country = await _getCurrentLocation()
  allResources['currentLocation'] = (allResources.countries.some(item => item.slug == country)) ? country : 've';

  const states = _getStates(allResources.countries, country)
  allResources['currentStates'] = states ? states : []

  const countryPosts = Filter(allResources['posts'], country, 'country');
  const outstanding = Filter(countryPosts, true, 'outstanding');

  dispatch(actionObject(GET_RESOURCES, allResources))
  dispatch(actionObject(UPDATE_POSTS, {
    countryPosts: countryPosts,
    statePosts: countryPosts,
    categoryPosts: countryPosts,
    filterPosts: countryPosts,
    outstandingPosts: outstanding
  }))
}

export const changeResources = (country) => (dispatch, getState) => {
  const { resource: { countries, posts } } = getState()
  const states = _getStates(countries, country)

  const resources = {
    currentLocation: country,
    currentStates: states ? states : []
  }

  const countryPosts = Filter(posts, country, 'country');
  const outstanding = Filter(countryPosts, true, 'outstanding');

  dispatch(actionObject(CHANGE_RESOURCES, resources))
  dispatch(actionObject(UPDATE_POSTS, { countryPosts: countryPosts, filterPosts: countryPosts, outstandingPosts: outstanding }))
}

const _getCurrentLocation = async () => {
  try {
    const response = await axios.get('https://extreme-ip-lookup.com/json/')
    const country = response.data.countryCode.toLowerCase()

    return country

  } catch {
    return 've'
  }
}

const _getStates = (countries, country) => {
  const states = countries.find(resource => resource.slug == country)
  return states?.statesField?.states
}
