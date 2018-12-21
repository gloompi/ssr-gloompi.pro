import { Map, Record } from 'immutable'
import { put, call, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { arrToImmObj } from 'Src/helpers'
import { appName, api } from 'Root/configClient'

const ArticleRecord = Record({
  slug: '',
  title: '',
  cover_picture: null,
  content: '',
  category: [],	
  announce: '',
  author: 'GlooMpiQue',
  meta_title:	'',
  meta_description:	'',
  date_added: null,
})

const ReducerRecord = Record({
  loaded: null,
  entities: new Map,
  entitiesByCategory: [],
  categories: [],
  article: null,
  articleLoaded: false,
})

export const modulName = 'articles'
export const SET_ARTICLES_BY_CATEGORY = `${appName}/${modulName}/SET_ARTICLES_BY_CATEGORY`
export const FETCH_ARTICLE_BY_SLUG = `${appName}/${modulName}/FETCH_ARTICLE_BY_SLUG`
export const FETCH_ARTICLE_BY_SLUG_SUCCESS = `${appName}/${modulName}/FETCH_ARTICLE_BY_SLUG_SUCCESS`
export const FETCH_ARTICLE_BY_SLUG_ERROR = `${appName}/${modulName}/FETCH_ARTICLE_BY_SLUG_ERROR`
export const FETCH_ARTICLES_REQUEST = `${appName}/${modulName}/FETCH_ARTICLES_REQUEST`
export const FETCH_ARTICLES_SUCCESS = `${appName}/${modulName}/FETCH_ARTICLES_SUCCESS`
export const FETCH_ARTICLES_ERROR = `${appName}/${modulName}/FETCH_ARTICLES_ERROR`

export default (state = new ReducerRecord, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ARTICLES_REQUEST:
      return state.set('loaded', null)

    case FETCH_ARTICLES_SUCCESS:
      const { articles, categories } = payload
      return state
        .set('loaded', true)
        .set('entities', arrToImmObj(articles, ArticleRecord, 'pk'))
        .set('categories', categories)

    case FETCH_ARTICLES_ERROR:
      return state
        .set('loaded', true)

    case FETCH_ARTICLE_BY_SLUG:
      return state.set('articleLoaded', null)

    case FETCH_ARTICLE_BY_SLUG_SUCCESS:
      const { data } = payload
      return state
        .set('articleLoaded', true)
        .set('article', data)

    case SET_ARTICLES_BY_CATEGORY:
      return state.set('entitiesByCategory', payload.articles)

    default:
      return state
  }
}

export const setArticlesByCategory = (categoryId, articles) => {
  const filteredArticles = articles.filter(({ category }) => category.some((id) => id == categoryId))
  return {
    type: SET_ARTICLES_BY_CATEGORY,
    payload: { articles: filteredArticles },
  }
}

export const fetchArticles = () => ({
  type: FETCH_ARTICLES_REQUEST
})

export const fetchArticleBySlug = (slug) => ({
  type: FETCH_ARTICLE_BY_SLUG,
  payload: { slug }
})

const fetchArticlesSaga = function * () {
  try {
    let articles = yield call(axios, `${api}/articles/`)
    let categories = yield call(axios, `${api}/article-categories/`)
        
    articles = articles.data.results
    categories = categories.data.results

    yield put({
      type: FETCH_ARTICLES_SUCCESS,
      payload: { articles, categories }
    })
  } catch (error) {
    yield put({
      type: FETCH_ARTICLES_ERROR
    })
  }
}

const fetchArticleBySlugSaga = function * ({ payload: { slug } }) {
  try {
    let { data } = yield call(axios, `${api}/articles/${slug}`)

    yield put({
      type: FETCH_ARTICLE_BY_SLUG_SUCCESS,
      payload: { data }
    })
  } catch (error) {
    yield put({
      type: FETCH_ARTICLE_BY_SLUG_ERROR
    })
  }
}

export const saga = function * () {
  yield takeEvery(FETCH_ARTICLES_REQUEST, fetchArticlesSaga)
  yield takeEvery(FETCH_ARTICLE_BY_SLUG, fetchArticleBySlugSaga)
}
