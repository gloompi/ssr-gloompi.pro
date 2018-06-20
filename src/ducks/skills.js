import {Map, Record} from 'immutable'
import {put, call, takeEvery} from 'redux-saga/effects'
import axios from 'axios'

import {arrToImmObj} from '../helpers'
import {appName, api} from '../../configClient'

const SkillRecord = Record({
  title: "",
  knowledge: 0,
  category: null
})

const ReducerRecord = Record({
  loaded: null,
  entities: new SkillRecord,
  categories: []
})

export const modulName = 'skills'
export const FETCH_SKILLS_REQUEST = `${appName}/${modulName}/FETCH_SKILLS_REQUEST`
export const FETCH_SKILLS_SUCCESS = `${appName}/${modulName}/FETCH_SKILLS_SUCCESS`
export const FETCH_SKILLS_ERROR = `${appName}/${modulName}/FETCH_SKILLS_ERROR`

export default (state = new ReducerRecord, action) => {
  const {type, payload} = action
  switch (type) {
    case FETCH_SKILLS_REQUEST:
      return state.set('loaded', null)

    case FETCH_SKILLS_SUCCESS:
      const {skills, categories} = payload
      return state
        .set('loaded', true)
        .set('entities', arrToImmObj(skills, SkillRecord, 'title'))
        .set('categories', categories)

    case FETCH_SKILLS_ERROR:
      return state
        .set('loaded', false)

    default:
      return state
  }
}

export const fetchSkills = () => {
  return {
    type: FETCH_SKILLS_REQUEST
  }
}

const fetchSkillsSaga = function * () {
  try {
    let {data} = yield call(axios, `${api}/skills/`)
    const skills = data.results
    const list = yield call(axios, `${api}/skill-categories/`)
    const categories = list.data.results

    skills.map(item => {
      const category = categories.filter(({id}) => id == item.category)[0]
      item.category = category
    })

    yield put({
      type: FETCH_SKILLS_SUCCESS,
      payload: {skills, categories}
    })
  } catch (error) {
    yield put({
      type: FETCH_SKILLS_ERROR
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_SKILLS_REQUEST, fetchSkillsSaga)
}