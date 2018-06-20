import {saga as aboutSaga} from '../ducks/about'
import {saga as skillsSaga} from '../ducks/skills'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
  try {
    yield all([
      aboutSaga(),
      skillsSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}