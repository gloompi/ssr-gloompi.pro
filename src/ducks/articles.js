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

export const modulName = 'articles'
export const SET_ARTICLES_BY_CATEGORY = `${appName}/${modulName}/SET_ARTICLES_BY_CATEGORY`
export const FETCH_ARTICLES_REQUEST = `${appName}/${modulName}/FETCH_ARTICLES_REQUEST`
export const FETCH_ARTICLES_SUCCESS = `${appName}/${modulName}/FETCH_ARTICLES_SUCCESS`
export const FETCH_ARTICLES_ERROR = `${appName}/${modulName}/FETCH_ARTICLES_ERROR`

export default (state = new ReducerRecord, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ARTICLES_REQUEST:
      return state.set('loaded', null)

    case FETCH_ARTICLES_SUCCESS:
      const { works, categories } = payload
      return state
        .set('loaded', true)
        .set('entities', arrToImmObj(works, WorkRecord, 'pk'))
        .set('categories', categories)

    case FETCH_ARTICLES_ERROR:
      return state
        .set('loaded', false)

    case SET_ARTICLES_BY_CATEGORY:
      return state.set('entitiesByCategory', payload.works)

    default:
      return state
  }
}

export const setWorksByCategory = (categoryId, works) => {
  const filteredWorks = works.filter(({ category }) => category.some(({ id }) => id == categoryId))
  return {
    type: SET_ARTICLES_BY_CATEGORY,
    payload: { works: filteredWorks },
  }
}

export const fetchWorks = () => {
  return {
    type: FETCH_ARTICLES_REQUEST
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
      type: FETCH_ARTICLES_SUCCESS,
      payload: { works, categories }
    })
  } catch (error) {
    yield put({
      type: FETCH_ARTICLES_ERROR
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_ARTICLES_REQUEST, fetchWorksSaga)
}