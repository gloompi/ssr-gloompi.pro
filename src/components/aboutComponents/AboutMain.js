import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './style'
import { fetchAbout } from 'Ducks/about'
import { createMarkup } from 'Src/helpers'
import Loader from 'Components/Loader'
import Star from 'Components/svg/star1'

class AboutMain extends Component {
  componentDidMount = () => {
    const { fetchAbout, loaded } = this.props
    if(!loaded){
      fetchAbout()
    }
  }
  
  render() {
    const { entities, loaded } = this.props
    if(!loaded) return <Loader />
    const { title, cover_picture, content } = entities
    return (
      <section className={style.about__section}>
        <div className={style.about__title_wrap}>
          <Star />
          <h2 className={style.about__title}>{title}</h2>
        </div>
        <div className={style.about__pic_wrap}>
          <img src={cover_picture} className={style.about__img} />
        </div>
        <div className={style.about__content} dangerouslySetInnerHTML={createMarkup(content)} />
      </section>
    )
  }
}

export default connect(({ about }) => ({
  loaded: about.loaded,
  entities: about.entities
}), { fetchAbout })(AboutMain)