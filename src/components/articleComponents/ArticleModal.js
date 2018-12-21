import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { ObjToImmArr, createMarkup } from 'Src/helpers'
import { fetchArticleByPK } from 'Ducks/articles'
import Loader from 'Components/Loader'
import style from './style'

const ArticleModal = (props) => {
  console.log('PROPS', props)
  return (
    <div>
      
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
  }), ({ fetchArticleByPK })),
  lifecycle({
    componentDidMount() {
      const {
        match: {
          params: { title },
        },
        loaded,
        fetchArticleByPK,
      } = this.props
      if (!loaded) fetchArticleByPK(title)
    }
  }),
)(ArticleModal)
