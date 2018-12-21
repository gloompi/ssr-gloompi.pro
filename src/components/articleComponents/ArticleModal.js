import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  compose,
  lifecycle,
  withProps,
  withState,
  withHandlers,
} from 'recompose'

import { ObjToImmArr, createMarkup } from 'Src/helpers'
import { fetchArticleBySlug } from 'Ducks/articles'
import Loader from 'Components/Loader'
import Footer from 'Components/Footer'
import style from './style'

const ArticleModal = ({
  article,
  articleLoaded,
  loaded,
  ready,
  getContent,
  handleLoaded,
}) => (
  <Fragment>
    <div className={style.article__modal}>
      {
        (articleLoaded || loaded)
          && (
            <img
              src={article.cover_picture}
              className={style.article__modal_img}
              onLoad={handleLoaded}
              alt={article.title}
            />
          )
      }
      {
        ready
          ? getContent(article)
          : <Loader width={150} />
      }
    </div>
    <Footer />
  </Fragment>
)

export default compose(
  connect(({ 
    articles: {
      entitiesByCategory,
      categories,
      entities,
      article,
      loaded,
      articleLoaded,
    } 
  }) => ({
    entities: ObjToImmArr(entities),
    entitiesByCategory,
    articleLoaded,
    categories,
    article,
    loaded,
  }), ({ fetchArticleBySlug })),
  withState('ready', 'setReady', false),
  lifecycle({
    componentDidMount() {
      const {
        match: {
          params: { slug },
        },
        loaded,
        fetchArticleBySlug,
      } = this.props
      if (!loaded) fetchArticleBySlug(slug)
    }
  }),
  withProps(({
    match: { params: { slug } },
    entities,
    loaded,
  }) => {
    if (loaded) return {
      article: entities.find(article => article.slug == slug)
    }
  }),
  withHandlers({
    handleLoaded: ({ setReady }) => e => {
      setReady(true)
    },
    getContent: () => ({
      title,
      content,
      date_added,
    }) => (
      <article className={style.article__modal_container}>
        <h3 className={style.article__modal_title}>{title}</h3>
        <span className={style.article__modal_date}>{date_added.slice(0, date_added.indexOf('T'))}</span>
        <div className={style.article__modal_content} dangerouslySetInnerHTML={createMarkup(content)} />
      </article>
    )
  }),
)(ArticleModal)
