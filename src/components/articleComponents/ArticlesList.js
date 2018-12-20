import React from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'

import { ObjToImmArr, createMarkup } from 'Src/helpers'
import { fetchArticles } from 'Ducks/articles'
import Loader from 'Components/Loader'
import style from './style'

const ArticlesList = ({
  loaded,
  entities,
  entitiesByCategory,
  getContent,
}) => {
  if (!loaded) return <Loader width={80} />
  return (
    <div className={`${style.container} ${style.article__wrap}`}>
      <ul className={style.article__list}>
        {
          entitiesByCategory && !_.isEmpty(entitiesByCategory)
            ? getContent(entitiesByCategory)
            : getContent(entities)
        }
      </ul>
    </div>
  )
}

export default compose(
  connect(({ 
    articles: {
      entitiesByCategory,
      categories,
      entities,
      loaded,
    } 
  }) => ({
    entities: ObjToImmArr(entities),
    entitiesByCategory,
    categories,
    loaded,
  }), ({ fetchArticles })),
  lifecycle({
    componentDidMount() {
      const { loaded, fetchArticles } = this.props
      if (!loaded) fetchArticles()
    }
  }),
  withHandlers({
    handleLoaded: () => e => {
      e.target.parentElement.style = 'animation: 2s ease 0s 1 normal none running bGJZDZ; backface-visibility: visible;'
    }
  }),
  withHandlers({
    getContent: ({ handleLoaded }) => (list) => (
      list.map(({
        pk,
        meta_title,
        title,
        cover_picture,
        announce,
      }) => (
        <li
          key={pk} 
          className={style.article__item}
        >
          <Link to={`/blog/article/${meta_title}`} className={style.article__link}>
            <img src={cover_picture} onLoad={handleLoaded} alt={title} />
            <div className={style.article__container}>
              <h3 className={style.article__title}>{title}</h3>
              <div className={style.article__content} dangerouslySetInnerHTML={createMarkup(announce)} />
            </div>
          </Link>
        </li>
      ))
    )
  })
)(ArticlesList)

