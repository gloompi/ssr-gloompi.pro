import { all } from 'redux-saga/effects'
import { saga as aboutSaga } from 'Ducks/about'
import { saga as skillsSaga } from 'Ducks/skills'
import { saga as worksSaga } from 'Ducks/works'

export default function * rootSaga() {
  try {
    yield all([
      aboutSaga(),
      skillsSaga(),
      worksSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}