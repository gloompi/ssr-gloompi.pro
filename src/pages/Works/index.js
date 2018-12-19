import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  Entrance,
  FadeInLeft,
  FadeInRight,
} from 'animate-components'

import style from './style'
import Header from 'Components/Header'
import Category from 'Components/workComponents/Category'
import List from 'Components/workComponents/List'
import Slider from 'Components/workComponents/Slider'
import Footer from 'Components/Footer'

class Works extends Component{
  state = {
    open: false,
    work: null,
    right: null,
    left: null,
  }

  constructor(props) {
    super(props)
    this.scrollElement = React.createRef()
  }

  render() {
    const { work, open, left, right } = this.state
    const { entities } = this.props
    const nextWork = entities.get(work - 1)
    const prevWork = entities.get(work + 1)
    return (
      <div className={style.page__main}>
        <Helmet>
          <title>Works | GloompiQue</title>
        </Helmet>
        <Header scrollElement={this.scrollElement} />
        <main ref={this.scrollElement} className={style.works__main}>
          <Category />
          <List handleClick={this.handleClick} />
          {open && <div className={style.slider__wrap}>
            {
              !left && !right
                ? <Entrance
                  duration='1s'
                  as='div'
                  className={style.slider__animate}
                  component={() => <Slider
                    handleNext={this.handleNext}
                    handlePrev={this.handlePrev}
                    handleClose={this.handleClose}
                    nextWork={nextWork}
                    prevWork={prevWork}
                    {...this.state}
                  />}
                />
                : left
                  ? <FadeInLeft
                    duration='1s' 
                    as='div'
                    className={style.slider__animate}
                    component={() => <Slider
                      handleNext={this.handleNext}
                      handlePrev={this.handlePrev} 
                      handleClose={this.handleClose} 
                      nextWork={nextWork}
                      prevWork={prevWork}
                      {...this.state}
                    />} 
                  />
                  : <FadeInRight
                    duration='1s' 
                    as='div'
                    className={style.slider__animate}
                    component={() => <Slider 
                      handleNext={this.handleNext}
                      handlePrev={this.handlePrev}
                      handleClose={this.handleClose} 
                      nextWork={nextWork}
                      prevWork={prevWork}
                      {...this.state}
                    />} 
                  />
            }
          </div>}
        </main>
        <Footer />
      </div>
    )
  }

  handleNext = () => {
    const nextWork = this.state.work - 1
    if (!this.props.entities.get(nextWork)) return null
    this.setState(state => ({
      ...state,
      left: null,
      right: true,
      work: nextWork,
      open: true,
    }))
  }

  handlePrev = () => {
    const prevWork = this.state.work + 1
    if (!this.props.entities.get(prevWork)) return null
    this.setState(state => ({
      ...state,
      left: true,
      right: null,
      work: prevWork,
      open: true,
    }))
  }

  handleClick = (work) => {
    this.setState(state => ({ ...state, work, open: true }))
  }

  handleClose = () => {
    this.setState(state => ({ ...state, work: null, open: false, left: false, right: false }))
  }
}

export default connect(({ works: { entities } }) => ({ entities }))(Works)