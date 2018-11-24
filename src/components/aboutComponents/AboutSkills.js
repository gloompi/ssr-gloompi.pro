import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './style'
import { fetchSkills } from 'Ducks/skills'
import { ObjToImmArr } from 'Src/helpers'
import Loader from 'Components/Loader'
import Progress from 'Components/svg/circleProgress'

class AboutSkills extends Component {
  componentDidMount() {
    const {loaded, fetchSkills} = this.props
    if(!loaded) fetchSkills()
  }

  render() {
    const {loaded, entities, categories} = this.props
    if(!loaded) return <Loader />
    return (
      <section className={style.about__section}>
        <h3 className={style.section__title}>What can i do for you</h3>
        <p className={style.section__descr}>Frontend engineer with good BackEnd knowledge.</p>
        <ul className={style.skills__category_list}>
          {categories.map(category => {
            const {title, id} = category
            return <li key={id}>
              <h3 className={style.skills__category_title}>{title}</h3>
              <ul className={style.skills__list}>
                {ObjToImmArr(entities)
                  .filter(({ category }) => category.id == id)
                  .map(item => {
                    const { title, knowledge } = item
                    return <li key={title} className={style.skills__item}>
                      <h3>{title}</h3>
                      <Progress percent={knowledge} />
                    </li>
                })}
              </ul>
            </li>
          })}
        </ul>
      </section>
    )
  }
}

export default connect(({skills}) => ({
  loaded: skills.loaded,
  entities: skills.entities,
  categories: skills.categories
}), {fetchSkills})(AboutSkills)