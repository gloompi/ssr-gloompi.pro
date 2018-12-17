import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import style from './style'
import { ObjToImmArr } from 'Src/helpers'
import { setWorksByCategory } from 'Ducks/works'

const Category = ({ loaded, categories, handleClick }) => (
  <ul className={style.works__category_list}>
    {loaded
      && <li className={style.works__category_item}>
        <a
          href=''
          onClick={e => handleClick(e, 'all')}
          className={style.works__category_link}
        >
          All
        </a>
      </li>
    }
    {loaded && categories.map(({ title, id }) => (
      <li key={id} className={style.works__category_item}>
        <a
          href=''
          onClick={e => handleClick(e, id)}
          className={style.works__category_link}
        >
          {title}
        </a>
      </li>
    ))}
  </ul>
)

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
  }), ({ setWorksByCategory })),
  withHandlers({
    handleClick: ({ setWorksByCategory, entities }) => (e, id) => {
      e.preventDefault()
      setWorksByCategory(id, entities)
    }
  })
)(Category)
