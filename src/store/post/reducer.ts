import { AnyAction } from 'redux';
import { SET_FILTER, UPDATE_POSTS } from './action_types'

const initialState = {
  countryPosts: [],
  outstandingPosts: [],
  statePosts: [],
  categoryPosts: [],
  filterPosts: [],
  filter: {
    state: '',
    category: '',
    title: '',
    checkedOne: true,
    checkedTwo: true,
  }
}

const post = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case UPDATE_POSTS:
      return { ...state, ...payload }
    case SET_FILTER:
      return { ...state, ...{ filter: {...state.filter, ...payload } } }
    default:
      return state
  }
}

export default post
