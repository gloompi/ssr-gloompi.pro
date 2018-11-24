import { Map, Record } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { getCookie } from 'Src/helpers'
import { appName, jwtSecretName, api } from 'Root/configClient'

const ReducerRecord = Record({
  user: {},
  userLoaded: null,
  error: null,
  loaded: null
})

export const modulName = 'authentication'
export const FETCH_AUTH_REQUEST = `${appName}/${modulName}/FETCH_AUTH_REQUEST`
export const FETCH_AUTH_SUCCESS = `${appName}/${modulName}/FETCH_AUTH_SUCCESS`
export const FETCH_AUTH_ERROR = `${appName}/${modulName}/FETCH_AUTH_ERROR`

export default (state = new ReducerRecord, action) => {
  const { type, payload, error } = action
  switch (type) {
    case FETCH_AUTH_REQUEST:
      return state.set('loaded', false)

    case FETCH_AUTH_SUCCESS:
      return state
        .set('loaded', true)
        .set('error', false)

    case FETCH_AUTH_ERROR:
      return state
        .set('loaded', true)
        .set('error', error)

    default:
      return state
  }
}

export const fetchAuth = (username, password, history) => {
  return {
    type: FETCH_AUTH_REQUEST,
    username, password, history
  }
}

const fetchAuthSaga = function * ({ username, password, history }) {
  const authentication = { username, password }
  const csrf = getCookie('csrftoken')
  try {
    const response = yield call(axios, {
      url: `${api}/auth/`,
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': `${csrf}`
      },
      data: authentication,
    })
    yield localStorage.setItem(jwtSecretName, response.data.token)
    yield localStorage.setItem('userName', username)
    yield put({
      type: FETCH_AUTH_SUCCESS,
    })
    history.push('/account')
  } catch (error) {
    if(error.response.status == 400) alert('Введены неверные данные')
    yield put({
      type: FETCH_AUTH_ERROR,
      error
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_AUTH_REQUEST, fetchAuthSaga)
}