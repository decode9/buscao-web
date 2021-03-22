import { ABOUT_US_SCROLL } from './action-types';
import { AnyAction } from 'redux';

const initialState = {
	scroll: false
}

 const setScrollReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch(type) {
    case ABOUT_US_SCROLL:
    return { ...state, scroll: payload }

    default:
    return state;
  }
}

export default setScrollReducer
