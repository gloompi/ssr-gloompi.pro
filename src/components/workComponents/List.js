import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import style from './style'

import { ObjToImmArr } from 'Src/helpers'
import { fetchWorks } from 'Ducks/works'
import Loader from 'Components/Loader'

const List = ({ entities, loaded, handleClick }) => {
  if(!loaded) return <Loader />
  return (
    <ul className={`${style.works__list} ${style.container}`}>
      {entities.map(({
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
          <img src={cover_picture} alt={title} />
          <div className={style.popup__wrap}>
            <h3>{title}</h3>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default compose(
  connect(({ 
    works: {
      categories,
      entities,
      loaded,
    } 
  }) => ({
    entities: ObjToImmArr(entities),
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