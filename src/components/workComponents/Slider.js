import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Bounce } from 'animate-components'

import { createMarkup } from 'Src/helpers'
import style from './style'
import TechIcons from './TechIcons'

class Slider extends Component {
  constructor() {
    super()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  showLog(){
    console.log('showLog')
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside(e) {
    let withinListItems = ReactDOM.findDOMNode(this).contains(e.target);
    if (!withinListItems) {
      this.props.handleClose()
    }
  }

  render() {
    const { 
      work, 
      entities, 
      handleClose,
      handleNext,
      handlePrev,
      nextWork,
      prevWork
    } = this.props
    const {
      date_added,
      content,
      bgcolor,
      title,
      link,
      tech,
      pics
    } = entities.get(work)
    return (
      <div
        className={style.slider__container} 
        style={{background: bgcolor}}
      >
        <span className={style.slider__close} onClick={handleClose}>
          <i className='fas fa-times' />
        </span>
        {prevWork && <span className={style.slider__prev} onClick={handlePrev}>
          <i className='fas fa-caret-left' />
        </span>}
        {nextWork && <span className={style.slider__next} onClick={handleNext}>
          <i className='fas fa-caret-right' />
        </span>}
        <ul className={style.pics__list}>
          {pics.map(({ pic }, idx) => (
            <li key={idx} className={style.pics__item}>
              <Bounce duration='2s' as='img' src={pic} alt='work pics'/>
            </li>
          ))}
        </ul>
        <div className={style.slider__info}>
          <h2 className={style.slider__info_title}>{title}</h2>
          <span className={style.slider__info_date}>{date_added.slice(0, date_added.indexOf('T'))}</span>
          <ul className={style.tech__list}>
            {tech.map(({ icon }, idx) => (
              <li key={idx} className={style.tech__item}>
                <TechIcons icon={icon} />
              </li>
            ))}
          </ul>
          <div className={style.slider__content} dangerouslySetInnerHTML={createMarkup(content)} />
          <a href={link} className={style.slider__link}>Go to website</a>
        </div>
      </div>
    )
  }
}

export default connect(({ works: { entities } }) => ({ entities }))(Slider)
