import { Map, Record } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { appName, api } from 'Root/configClient'

const AboutRecord = Record({
  title: "",
  cover_picture: null,
  content: ""
})

const ReducerRecord = Record({
  loaded: null,
  entities: new AboutRecord
})

export const modulName = 'about'
export const FETCH_ABOUT_REQUEST = `${appName}/${modulName}/FETCH_ABOUT_REQUEST`
export const FETCH_ABOUT_SUCCESS = `${appName}/${modulName}/FETCH_ABOUT_SUCCESS`
export const FETCH_ABOUT_ERROR = `${appName}/${modulName}/FETCH_ABOUT_ERROR`

export default (state = new ReducerRecord, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ABOUT_REQUEST:
      return state.set('loaded', null)

    case FETCH_ABOUT_SUCCESS:
      const { title, cover_picture, content } = payload
      return state
        .set('loaded', true)
        .set('entities', new AboutRecord({
          'title': title, 
          'cover_picture': cover_picture, 
          'content': content
        }))

    case FETCH_ABOUT_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchAbout = () => {
  return {
    type: FETCH_ABOUT_REQUEST
  }
}

const fetchAboutSaga = function * () {
  try {
    const {data} = yield call(axios, {
      url: `${api}/about/`,
      method: 'get'
    })
    yield put({
      type: FETCH_ABOUT_SUCCESS,
      payload: data.results[0]
    })
  } catch (error) {
    yield put({
      type: FETCH_ABOUT_ERROR
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_ABOUT_REQUEST, fetchAboutSaga)
}