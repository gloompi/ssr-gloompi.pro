import { Record } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { arrToImmObj } from 'Src/helpers'
import { appName, api } from 'Root/configClient'

const WorkRecord = Record({
  pk: null,
  title: '',
  cover_picture: '',
  category: [],
  content: '',
  link: '',
  bgcolor: '#000',
  date_added: null,
  tech: [],
  pics: []
})

const ReducerRecord = Record({
  loaded: null,
  entities: new WorkRecord,
  entitiesByCategory: [],
  categories: []
})

export const modulName = 'works'
export const SET_WORKS_BY_CATEGORY = `${appName}/${modulName}/SET_WORKS_BY_CATEGORY`
export const FETCH_WORKS_REQUEST = `${appName}/${modulName}/FETCH_WORKS_REQUEST`
export const FETCH_WORKS_SUCCESS = `${appName}/${modulName}/FETCH_WORKS_SUCCESS`
export const FETCH_WORKS_ERROR = `${appName}/${modulName}/FETCH_WORKS_ERROR`

export default (state = new ReducerRecord, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_WORKS_REQUEST:
      return state.set('loaded', null)

    case FETCH_WORKS_SUCCESS:
      const { works, categories } = payload
      return state
        .set('loaded', true)
        .set('entities', arrToImmObj(works, WorkRecord, 'pk'))
        .set('categories', categories)

    case FETCH_WORKS_ERROR:
      return state
        .set('loaded', false)

    case SET_WORKS_BY_CATEGORY:
      return state.set('entitiesByCategory', payload.works)

    default:
      return state
  }
}

export const setWorksByCategory = (categoryId, works) => {
  const filteredWorks = works.filter(({ category }) => category.some(({ id }) => id == categoryId))
  return {
    type: SET_WORKS_BY_CATEGORY,
    payload: { works: filteredWorks },
  }
}

export const fetchWorks = () => {
  return {
    type: FETCH_WORKS_REQUEST
  }
}

const fetchWorksSaga = function * () {
  try {
    let works = yield call(axios, `${api}/works/`)
    let categories = yield call(axios, `${api}/work-categories/`)
    let techs = yield call(axios, `${api}/work-techs/`)
    let pics = yield call(axios, `${api}/work-pics/`)
        
    works = works.data.results
    categories = categories.data.results
    techs = techs.data.results
    pics = pics.data.results
    works.forEach(item => {
      item.pics = pics.filter(({ work }) => work == item.pk)
      item.tech = item.tech.map(key => techs.find(({ pk }) => pk == key))
      item.category = item.category.map(key => categories.find(({ id }) => id == key))
    })

    yield put({
      type: FETCH_WORKS_SUCCESS,
      payload: { works, categories }
    })
  } catch (error) {
    yield put({
      type: FETCH_WORKS_ERROR
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_WORKS_REQUEST, fetchWorksSaga)
}