import { ABOUT_US_SCROLL } from './action-types'

export const setScroll = (scroll: boolean) => {
  return {
    type: ABOUT_US_SCROLL,
    payload: scroll
  }
}
