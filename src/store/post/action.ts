import { SET_FILTER, UPDATE_POSTS } from './action_types'
import { actionObject, Filter } from '../../utils'
import { SHOW_LOADER } from '../loader/action-types';

const _filterSelection = (posts, filter, select) => {
  const post = {
    'state': posts.countryPosts,
    'categories': posts.statePosts,
    'title': posts.categoryPosts
  }

  const result = Filter(post[select], filter, select)

  switch (select) {
    case 'state':

      const filterPost = []

      for(let oldPost of result){
        let post = JSON.parse(JSON.stringify(oldPost));
        post.commerce.subsidiary = Filter(post.commerce.subsidiary, filter, 'subsidiary');
        filterPost.push(post)
      }

      return {
        statePosts: filterPost,
        categoryPosts: filterPost,
        filterPosts: filterPost
      }
    case 'categories':
      return {
        categoryPosts: result,
        filterPosts: result
      }
    case 'title':
      return {
        filterPosts: result
      }
    default:
      break;
  }
}

export const countryPost = (country: string) => (dispatch, getState) => {
  const { resource: { posts } } = getState();
  const result = Filter(posts, country, 'country');
  const outstanding = Filter(result, true, 'outstanding');
  dispatch(actionObject(UPDATE_POSTS, { countryPosts: result, statePosts: result, categoryPosts: result, filterPosts: result, outstandingPosts: outstanding }))
}

export const filterPosts = (filter: string, type) => (dispatch, getState) => {
  const { post } = getState();
  const result = _filterSelection(post, filter, type);
  dispatch(actionObject(UPDATE_POSTS, result))
}

export const setFilter = (filter) => (dispatch) => {
  dispatch(actionObject(SHOW_LOADER, true))
  dispatch(actionObject(SET_FILTER, filter))
  dispatch(actionObject(SHOW_LOADER, false))
}
