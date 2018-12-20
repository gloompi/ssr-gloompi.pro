import { all } from 'redux-saga/effects'
import { saga as aboutSaga } from 'Ducks/about'
import { saga as skillsSaga } from 'Ducks/skills'
import { saga as worksSaga } from 'Ducks/works'
import { saga as articlesSaga } from 'Ducks/articles'

export default function * rootSaga() {
  try {
    yield all([
      aboutSaga(),
      skillsSaga(),
      worksSaga(),
      articlesSaga(),
    ])
  } catch (error) {
    console.log('root saga---', error)
  }
}