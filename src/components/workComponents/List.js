import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { lifecycle, withHandlers, compose } from 'recompose'

import style from './style'

import { ObjToImmArr } from 'Src/helpers'
import { fetchWorks } from 'Ducks/works'
import Loader from 'Components/Loader'

const List = ({
  entitiesByCategory,
  entities,
  loaded,
  getContent,
}) => {
  if(!loaded) return <Loader width={150} />
  return (
    <ul className={`${style.works__list} ${style.container}`}>
      {entitiesByCategory && !_.isEmpty(entitiesByCategory)
        ? getContent(entitiesByCategory)
        : getContent(entities)
      }
    </ul>
  )
}

export default compose(
  connect(({ 
    works: {
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
  }), ({ fetchWorks })),
  lifecycle({
    componentDidMount() {
      const { 
        loaded, 
        fetchWorks
      } = this.props
      if(!loaded) fetchWorks()
    }
  }),
  withHandlers({
    handleLoaded: () => e => {
      e.target.parentElement.style = 'animation: 2s ease 0s 1 normal none running bGJZDZ; backface-visibility: visible;'
    }
  }),
  withHandlers({
    getContent: ({ handleClick, handleLoaded }) => (list) => (
      list.map(({
        pk,
        cover_picture,
        date_added,
        title,
      }) => (
        <li
          key={date_added} 
          onClick={() => handleClick(pk)}
          className={style.works__item}
        >
          <img src={cover_picture} onLoad={handleLoaded} alt={title} />
          <div className={style.popup__wrap}>
            <h3>{title}</h3>
          </div>
        </li>
      ))
    )
  })
)(List)

List.propTypes = {
  entities: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  categories: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  loaded: PropTypes.bool
}