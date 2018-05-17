import {saga as authSaga} from '../ducks/auth'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
  try {
    yield all([
      authSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}